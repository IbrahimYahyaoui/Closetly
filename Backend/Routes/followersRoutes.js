const express = require("express");
const {
  follow,
  unfollow,
  followersList,
  followingList,
  followSuggestion,
} = require("../Controllers/FollowersController");

const router = express.Router();

router.post("/add", follow);

router.post("/delete", unfollow);

router.get("/followersList/:id", followersList);
router.get("/followingList/:id", followingList);
router.get("/followSuggestion", followSuggestion);

module.exports = router;
