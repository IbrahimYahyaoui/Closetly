const express = require("express");
const { SignupUser, SigninUser } = require("../Controllers/AuthControllers");

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/signin", SigninUser);

module.exports = router;
