const User = require("../Models/userModel");

const follow = async (req, res) => {
  const { destinationId, sourceId } = req.body;
  try {
    // const destinationId = await User.findOne({ _id: destinationId });
    // update followers
    await User.updateOne(
      { _id: destinationId },
      { $addToSet: { followers: sourceId } }
    );
    // update following if not already following
    await User.updateOne(
      { _id: sourceId },
      { $addToSet: { following: destinationId } }
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
    const userList = await User.findOne({ _id: id });

    res.status(200).json(userList.followers);
    console.log();
  } catch (error) {
    console.log({ error: error.message });
  }
};
const followingList = async (req, res) => {
  const { id } = req.params;

  try {
    const userList = await User.findOne({ _id: id });

    res.status(200).json(userList.following);
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
    res.status(200).json(userList);
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
