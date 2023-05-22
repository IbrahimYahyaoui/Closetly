const Post = require("../Models/PostModel");
const mongoose = require("mongoose");
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
  try {
    const Allposts = await Post.find({});
    res.status(200).send(Allposts);
  } catch (error) {
    console.log(error);
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
