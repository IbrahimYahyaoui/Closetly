const Post = require("../Models/PostModel");
// add post
const addPost = async (req, res) => {
  const { Description, Outfit, UserId } = req.body;
  // console.log(req.body);
  try {
    const newPost = await Post.create({ Description, Outfit, UserId });
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete post
const DeletePost = (req, res) => {
  res.send("delete");
};

module.exports = {
  addPost,
  DeletePost,
};
