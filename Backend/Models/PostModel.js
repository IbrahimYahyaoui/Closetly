const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    Outfit: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
