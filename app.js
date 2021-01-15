const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const Story = require("./models/story");
const User = require("./models/user");
const passport = require("passport");
const authRoute = require("./routes/auth");
const indexRoute = require("./routes/index");
const storyRoute = require("./routes/stories");
const keys = require("./config/keys");
const truncate = require("./helpers/ejs");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

require("./config/passport")(passport);
app.use(methodOverride('_method'));



mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false})
.then((result) => {
const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log("listening for requests");
});
})
.catch(err => {throw err});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/stories", storyRoute);
