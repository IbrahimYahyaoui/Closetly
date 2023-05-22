const express = require("express");
const {
  addPost,
  DeletePost,
  getPost,
  getAllPosts,
} = require("../Controllers/PostController");
const router = express.Router();

// add post
router.post("/addPost", addPost);
// get All post
router.get("/getAllPosts", getAllPosts);
// get post by id
router.post("/getPost/:id", getPost);

// delete post
router.post("/deletePost", DeletePost);

module.exports = router;
