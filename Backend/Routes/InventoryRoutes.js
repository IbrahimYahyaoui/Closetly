const express = require("express");
const {
  addCloth,
  getCloths,
  deleteCloth,
} = require("../Controllers/InventoryController");

const multer = require("multer");

const router = express.Router();

const fileStorageEngine = multer.memoryStorage({});
const upload = multer({ storage: fileStorageEngine });

router.post("/addCloth", upload.single("image"), addCloth);

router.post("/getCloths", getCloths);

router.post("/deleteCloth", deleteCloth);

module.exports = router;
