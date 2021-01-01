const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const dBURI = require("./config/keys");

const app = express();

const port = 5000;
app.listen(port, () => {
console.log("listening for requests");
});

app.get("/", (req, res) => {
  res.send("It works");
});

// app.use("/auth", authRoute);
