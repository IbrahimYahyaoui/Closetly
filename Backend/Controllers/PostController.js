const Post = require("../Models/PostModel");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
// add post
const addPost = async (req, res) => {
  const { Description, Outfit, UserId } = req.body;
  // console.log(req.body);
  try {
    const newPost = await Post.create({ Description, Outfit, UserId });
    await User.findByIdAndUpdate(UserId, {
      $inc: { postCount: 1 }, // Increment the postCount field by 1
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid post id");
  }

  try {
    const post = await Post.findById(id);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log(error);
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
    const page = parseInt(req.body.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.body.limit) || 10; // Default to 10 posts per page if not specified

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Convert followingIds to ObjectId instances
    const followingObjectIds = followingIds.map(
      (id) => new mongoose.Types.ObjectId(id)
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
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      page,
      totalPages,
      totalCount,
      posts,
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

module.exports = {
  addPost,
  DeletePost,
  getPost,
  getAllPosts,
};
