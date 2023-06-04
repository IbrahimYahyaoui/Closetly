const User = require("../Models/userModel");

const follow = async (req, res) => {
  const { destinationId, sourceId } = req.body;
  try {
    await User.updateOne(
      { _id: destinationId },
      { $addToSet: { followers: sourceId } }
    );

    await User.updateOne(
      { _id: sourceId },
      { $addToSet: { following: destinationId } }
    );

    const user = await User.findOne({ _id: sourceId });

    const notificationData = {
      senderId: sourceId,
      action: "follow",
      senderName: user.username,
    };

    await User.updateOne(
      { _id: destinationId },
      { $push: { Notification: notificationData } }
    );

    res.status(200).json({
      message: "Followed successfully",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const unfollow = async (req, res) => {
  const { destinationId, sourceId } = req.body;
  try {
    // const destinationId = await User.findOne({ _id: destinationId });
    // update followers
    await User.updateOne(
      { _id: destinationId },
      { $pull: { followers: sourceId } }
    );
    // update following if not already following
    await User.updateOne(
      { _id: sourceId },
      { $pull: { following: destinationId } }
    );
    res.status(200).json({
      message: "Followed successfully",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
const followersList = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }, { followers: 1 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followerIds = user.followers;
    const followerUsers = await User.find(
      { _id: { $in: followerIds } },
      { username: 1, profilePic: 1 }
    );

    res.status(200).json(followerUsers);
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(500)
      .json({ error: "An error occurred while fetching followers list" });
  }
};

const followingList = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }, { following: 1 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingIds = user.following;
    const followingUsers = await User.find(
      { _id: { $in: followingIds } },
      { username: 1, profilePic: 1 }
    );

    res.status(200).json(followingUsers);
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(500)
      .json({ error: "An error occurred while fetching following list" });
  }
};

const followSuggestion = async (req, res) => {
  // get random chunks of data from the database
  try {
    const userList = await User.aggregate([
      { $sample: { size: 15 } },
      { $project: { _id: 1, username: 1, profilePic: 1 } },
    ]);
    res.status(200).json(userList);
  } catch (error) {
    console.log({ error: error.message });
  }
};

const search = async (req, res) => {
  // username to search for
  const { username } = req.body;
  const { sender } = req.body;
  console.log(req.body); // ==> { username: 'ib', sender: 'Ibrahim_Yh' }
  try {
    const userList = await User.find(
      { username: { $regex: username, $options: "i" } },
      { username: 1, profilePic: 1 }
    );

    // Filter out sender's name from userList if included
    const filteredUserList = userList.filter(
      (user) => user.username !== sender
    );

    if (filteredUserList.length !== 0) {
      res.status(200).json(filteredUserList);
    } else {
      res.status(200).json("empty");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await User.findById(
      { _id: id },
      {
        username: 1,
        profilePic: 1,
        followers: 1,
        following: 1,
        inventory: 1,
        createdAt: 1,
        postCount: 1,
      }
    );
    res.status(200).json(profile);
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  follow,
  unfollow,
  followersList,
  followingList,
  followSuggestion,
  search,
  getProfile,
};
