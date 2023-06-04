const express = require("express");
const {
  SignupUser,
  SigninUser,
  getUser,
  changeUserprofilePic,
} = require("../Controllers/AuthControllers");
const multer = require("multer");
const router = express.Router();

const fileStorageEngine = multer.memoryStorage({});
const upload = multer({ storage: fileStorageEngine });

router.post("/signup", SignupUser);
router.post("/signin", SigninUser);
router.post(
  "/profilePicSet",
  upload.single("profilePic"),
  changeUserprofilePic
);

module.exports = router;
