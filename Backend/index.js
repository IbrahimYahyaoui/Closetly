require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// routes
const AuthRoutes = require("./Routes/AuthRoutes");

//  middleware
app.use(express.json());
// const apiProxy = createProxyMiddleware("/api", {
//   target: process.env.CORS_SOURCE,
//   changeOrigin: true,
// });
// app.use(apiProxy);
app.use(cors({}));

// Routes middleware
app.use("/Auth", AuthRoutes);
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
