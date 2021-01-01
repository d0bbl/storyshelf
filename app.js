const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const passport = require("passport");

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log("listening for requests");
});

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("It works");
});

app.use("/auth", authRoute);
