const express = require("express");
const {
  addCloth,
  getCloth,
  deleteCloth,
} = require("../Controllers/InventoryController");

const multer = require("multer");

const router = express.Router();

const fileStorageEngine = multer.memoryStorage({});
const upload = multer({ storage: fileStorageEngine });

router.post("/addCloth", upload.single("image"), addCloth);

router.get("/getCloth", getCloth);

router.delete("/deleteCloth/:id", deleteCloth);

module.exports = router;
