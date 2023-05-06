const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  picture: {
    type: string,
    required: true,
  },
  name: {
    type: string,
    required: true,
  },
  Category: {
    type: string,
    required: true,
  },
});

module.exports = mongoose.model("Cloth", ClothSchema);
