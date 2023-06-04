const express = require("express");
const {
  addPost,
  DeletePost,
  getPost,
  getAllPosts,
  addComment,
  addLike,
  addDislike,
  getAllNotification,
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
// like post like
router.post("/like", addLike);
// like post dislike
router.post("/dislike", addDislike);
// get all notification
router.post("/getNotification", getAllNotification);
module.exports = router;
