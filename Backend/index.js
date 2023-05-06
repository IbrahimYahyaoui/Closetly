require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// routes

const AuthRoutes = require("./Routes/AuthRoutes");
const InventoryRoutes = require("./Routes/InventoryRoutes");
//  middleware
app.use(express.json());

app.use(cors({}));

// Routes middleware
app.use("/Auth", AuthRoutes);
app.use("/inventory", InventoryRoutes);
// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
