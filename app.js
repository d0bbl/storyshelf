const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport")(passport);
const authRoute = require("./routes/auth");
const db = require("./config/keys");

const app = express();

app.use("/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log("listening for requests");
});

mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then((result) => {
  console.log("mongo connected");
})
.catch(err => {throw err});

app.get("/", (req, res) => {
  res.send("It works");
});
