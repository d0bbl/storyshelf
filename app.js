const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const cookieParser = require("cookie-parser");
const Story = require("./models/story");
const User = require("./models/user");
const passport = require("passport");
const authRoute = require("./routes/auth");
const indexRoute = require("./routes/index");
const storyRoute = require("./routes/stories");
const db = require("./config/keys");


const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
require("./config/passport")(passport);

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/stories", storyRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log("listening for requests");
});

mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then((result) => console.log("mongo connected"))
.catch(err => {throw err});
