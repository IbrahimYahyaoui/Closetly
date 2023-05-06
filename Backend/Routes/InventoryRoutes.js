const express = require("express");
const {
  addCloth,
  getCloth,
  deleteCloth,
} = require("../Controllers/InventoryController");

const router = express.Router();

router.post("/addCloth", addCloth);

router.get("/getCloth", getCloth);

router.delete("/deleteCloth/:id", deleteCloth);

module.exports = router;
