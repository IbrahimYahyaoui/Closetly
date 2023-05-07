const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const ClothSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cloth", ClothSchema);
