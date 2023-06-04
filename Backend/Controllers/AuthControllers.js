const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
async function handleUpload(file) {
  const folder = `ClosetlyProfilePic/`;
  const res = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
    transformation: [{ height: "0.3", width: "0.3", crop: "pad" }],
  });
  return res;
}
const SignupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup({
      username,
      password,
    });

    const token = createToken(user._id);

    res.status(200).json({ Username: user.username, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const SigninUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.signin({ username, password });

    const token = createToken(user._id);

    res
      .status(200)
      .json({ Username: user.username, token, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changeUserprofilePic = async (req, res) => {
  const { profilePic, id } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file" });
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64");

  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const cldRes = await handleUpload(dataURI);
  const imageUrl = cldRes.secure_url;
  console.log(imageUrl);
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { profilePic: imageUrl },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  SignupUser,
  SigninUser,
  getUser,
  changeUserprofilePic,
};
