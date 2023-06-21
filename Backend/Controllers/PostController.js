const Post = require("../Models/PostModel");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
// add post
const addPost = async (req, res) => {
  const { Description, Outfit, UserId } = req.body;

  try {
    const newPost = await Post.create({ Description, Outfit, UserId });

    // Get the user's followers
    const user = await User.findById(UserId);
    const followers = user.followers;

    // Create the notification data
    const notificationData = {
      postId: newPost._id,
      action: "addPost",
      senderId: UserId,
      senderName: user.username,
    };

    // Send notification to each follower
    followers.forEach(async (followerId) => {
      await User.findByIdAndUpdate(followerId, {
        $push: { Notification: notificationData },
      });
    });
    //  increment  post count
    await User.findByIdAndUpdate(UserId, {
      $inc: { postCount: 1 },
    });

    res.status(200).json({ newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get post
const getPost = async (req, res) => {
  // get id from params
  const { id } = req.params;
  // validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const posts = await Post.find({ UserId: id });

    if (posts.length > 0) {
      // Fetch user documents for the commenter IDs

      const commenterIds = posts.reduce(
        (ids, post) =>
          ids.concat(post.comments.map((comment) => comment.posterId)),
        []
      );
      //
      const commenters = await User.find(
        { _id: { $in: commenterIds } },
        { profilePic: 1 }
      );

      // Create an object to store profile picture links by user ID
      const profilePics = commenters.reduce((pics, commenter) => {
        pics[commenter._id.toString()] = commenter.profilePic;
        return pics;
      }, {});

      // Add profile picture links to each comment in the fetched posts
      const postsWithProfilePics = posts.map((post) => {
        const updatedComments = post.comments.map((comment) => ({
          ...comment,
          profilePic: profilePics[comment.posterId?.toString()] || "",
        }));
        return { ...post.toObject(), comments: updatedComments };
      });

      res.status(200).send(postsWithProfilePics);
    } else {
      res.status(404).send("No posts found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the posts");
  }
};
// get All post

const getAllPosts = async (req, res) => {
  const { currentUserId, page, limit } = req.body;
  console.log(currentUserId, page, limit);
  try {
    const currentUser = await User.findById(currentUserId);
    const followingIds = currentUser.following;

    // Pagination parameters
    const pageNumber = parseInt(page) || 1; // Default to page 1 if not specified
    const pageSize = parseInt(limit) || 10; // Default to 10 posts per page if not specified

    // Calculate the skip value based on the page and limit
    const skip = (pageNumber - 1) * pageSize;

    // Convert followingIds to ObjectId instances
    const followingObjectIds = followingIds.map((id) =>
      mongoose.Types.ObjectId.createFromHexString(id)
    );

    // Fetch the total count of posts to calculate the total number of pages
    const totalCount = await Post.countDocuments({
      UserId: { $in: followingObjectIds },
    });

    // Fetch the posts with pagination
    const posts = await Post.find({
      UserId: { $in: followingObjectIds },
    })
      .skip(skip)
      .limit(pageSize);

    // Fetch user documents for the commenter IDs
    const commenterIds = posts.reduce(
      (ids, post) =>
        ids.concat(post.comments.map((comment) => comment.posterId)),
      []
    );

    const commenters = await User.find(
      { _id: { $in: commenterIds } },
      { profilePic: 1 }
    );

    // Create an object to store profile picture links by user ID
    const profilePics = commenters.reduce((pics, commenter) => {
      pics[commenter._id.toString()] = commenter.profilePic;
      return pics;
    }, {});

    const postsWithProfilePics = posts.map((post) => {
      const updatedComments = post.comments.map((comment) => ({
        ...comment,
        profilePic: profilePics[comment.posterId?.toString()] || "",
      }));
      return {
        ...post.toObject(),
        comments: updatedComments,
      };
    });

    const totalPages = Math.ceil(totalCount / pageSize);
    //
    //

    res.status(200).json({
      page: pageNumber,
      totalPages,
      totalCount,
      post: postsWithProfilePics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching posts");
  }
};
// delete post
const DeletePost = (req, res) => {
  res.send("delete");
};

const addComment = async (req, res) => {
  const { postId, posterId, comment, poster } = req.body;

  try {
    const commentObj = {
      posterId,
      comment,
      poster,
    };

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: commentObj } },
      { new: true }
    );

    // Get the post owner
    const postOwner = await User.findById(post.UserId);

    // Create the notification data
    const notificationData = {
      postId: post._id,
      action: "addComment",
      senderId: posterId,
      senderName: poster,
    };

    // Send notification to the  followers

    const postOwnerFollowers = postOwner.followers;
    postOwnerFollowers.forEach(async (followerId) => {
      await User.findByIdAndUpdate(followerId, {
        $push: { Notification: notificationData },
      });
    });

    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding a comment");
  }
};

const addLike = async (req, res) => {
  const { postId, likerId, liker } = req.body;

  try {
    const likerObj = {
      likerId,
      liker,
    };

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If the liker has already disliked the post, remove it from dislikes
    const dislikeIndex = post.dislikes.findIndex(
      (dislike) => dislike.dislikerId === likerId
    );

    if (dislikeIndex !== -1) {
      post.dislikes.splice(dislikeIndex, 1);
    }

    // Check if liker has already liked the post
    const likeIndex = post.likes.findIndex((like) => like.likerId === likerId);

    if (likeIndex === -1) {
      // Add liker to likes array
      post.likes.push(likerObj);
    } else {
      // Remove from likes array
      post.likes.splice(likeIndex, 1);
    }

    await post.save();

    // Get the post owner
    const postOwner = await User.findById(post.UserId);

    // Create the notification data
    const notificationData = {
      postId: post._id,
      action: "addLike",
      senderId: likerId,
      senderName: liker,
    };

    // Send notification to the post owner and their followers
    await User.findByIdAndUpdate(postOwner._id, {
      $push: { Notification: notificationData },
    });

    const postOwnerFollowers = postOwner.followers;
    postOwnerFollowers.forEach(async (followerId) => {
      await User.findByIdAndUpdate(followerId, {
        $push: { Notification: notificationData },
      });
    });

    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while liking a post");
  }
};

const addDislike = async (req, res) => {
  const { postId, dislikerId, disliker } = req.body;

  try {
    const dislikerObj = {
      dislikerId,
      disliker,
    };

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If the disliker has already liked the post, remove it from likes
    const likeIndex = post.likes.findIndex(
      (like) => like.likerId === dislikerId
    );

    if (likeIndex !== -1) {
      post.likes.splice(likeIndex, 1);
    }

    // Check if disliker has already disliked the post
    const dislikeIndex = post.dislikes.findIndex(
      (dislike) => dislike.dislikerId === dislikerId
    );

    if (dislikeIndex === -1) {
      // Add disliker to dislikes array
      post.dislikes.push(dislikerObj);
    } else {
      // Remove from dislikes array
      post.dislikes.splice(dislikeIndex, 1);
    }

    await post.save();

    // Get the post owner
    const postOwner = await User.findById(dislikerId);

    // Create the notification data
    const notificationData = {
      postId: post._id,
      action: "addDislike",
      senderId: dislikerId,
      senderName: disliker,
    };

    // Send notification to the post owner's followers
    const postOwnerFollowers = postOwner.followers;
    postOwnerFollowers.forEach(async (followerId) => {
      await User.findByIdAndUpdate(followerId, {
        $push: { Notification: notificationData },
      });
    });

    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while disliking a post");
  }
};

const getAllNotification = async (req, res) => {
  const { id } = req.body;

  // Validate the provided ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const profile = await User.findById(id, {
      Notification: { $slice: -30 },
    }).sort({ _id: -1 });
    // Fetch user documents for the sender IDs in the notifications
    const senderIds = profile.Notification.map(
      (notification) => notification.senderId
    );
    const senders = await User.find(
      { _id: { $in: senderIds } },
      { profilePic: 1 }
    );

    // Create an object to store profile picture links by user ID
    const profilePics = senders.reduce((pics, sender) => {
      pics[sender._id.toString()] = sender.profilePic;
      return pics;
    }, {});

    // Add profile picture links to each notification
    const notificationsWithProfilePics = profile.Notification.map(
      (notification) => ({
        ...notification,
        senderProfilePic: profilePics[notification.senderId?.toString()] || "",
      })
    );
    // console.log(notificationsWithProfilePics);
    res.status(200).json(notificationsWithProfilePics);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addPost,
  DeletePost,
  getPost,
  getAllPosts,
  addComment,
  addLike,
  addDislike,
  getAllNotification,
};
