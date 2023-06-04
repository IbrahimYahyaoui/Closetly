const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    inventory: [],
    followers: [],
    following: [],
    postCount: { type: Number, default: 0 },
    Notification: [],
  },
  { timestamps: true }
);

// add a statics method to the schema
UserSchema.statics.signup = async function ({ username, password }) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (user) {
    throw Error("User already exists");
  } else {
    // crypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // add to mongo db
    return this.create({ username, password: hash });
  }
};

// static login method
UserSchema.statics.signin = async function ({ username, password }) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
