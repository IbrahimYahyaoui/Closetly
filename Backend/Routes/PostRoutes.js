const express = require("express");
const { addPost, DeletePost } = require("../Controllers/PostController");
const router = express.Router();

// add post
router.post("/addPost", addPost);
// delete post
router.post("/deletePost", DeletePost);

module.exports = router;
