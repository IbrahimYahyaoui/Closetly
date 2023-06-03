const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

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

module.exports = {
  SignupUser,
  SigninUser,
  getUser,
};
