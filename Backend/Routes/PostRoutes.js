const express = require("express");
const {
  addPost,
  DeletePost,
  getPost,
  getAllPosts,
  addComment,
} = require("../Controllers/PostController");
const router = express.Router();

// add post
router.post("/addPost", addPost);
// get All post
router.post("/getAllPosts", getAllPosts);
// get post by id
router.post("/getPost/:id", getPost);

// delete post
router.post("/deletePost", DeletePost);
// add post comment
router.post("/comment", addComment);

module.exports = router;
