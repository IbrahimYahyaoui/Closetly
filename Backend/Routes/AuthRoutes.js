const express = require("express");
const {
  SignupUser,
  SigninUser,
  getUser,
} = require("../Controllers/AuthControllers");

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/signin", SigninUser);
// router.get("/Getuser/:id", getUser);

module.exports = router;
