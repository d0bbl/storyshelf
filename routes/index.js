const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = require("../models/story");
const User = require("../models/user");
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({user: req.user.id})
  .populate("User")
  .then(stories => {
    res.render('index/dashboard', {stories,
      formatDate: require("../helpers/ejs")
    });
  })
  .catch(err => console.log(err));
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;
