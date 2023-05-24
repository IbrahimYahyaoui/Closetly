const User = require("../Models/userModel");

const follow = async (req, res) => {
  console.log("follow");
  res.send("follow");
};
const unfollow = async (req, res) => {
  console.log("unfollow");
  res.send("unfollow");
};
const followersList = async (req, res) => {
  const { id } = req.params;

  try {
    const userList = await User.findOne({ _id: id });

    res.status(200).json({
      followersList: userList.followers,
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
const followingList = async (req, res) => {
  const { id } = req.params;

  try {
    const userList = await User.findOne({ _id: id });

    res.status(200).json({
      followingList: userList.following,
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
const followSuggestion = async (req, res) => {
  // get random chunks of data from the database
  try {
    const userList = await User.aggregate([
      { $sample: { size: 15 } },
      { $project: { _id: 1, username: 1, profilePic: 1 } },
    ]);
    res.status(200).json({
      userList,
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  follow,
  unfollow,
  followersList,
  followingList,
  followSuggestion,
};
