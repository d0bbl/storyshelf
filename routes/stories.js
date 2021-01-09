const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");
const Story = require("../models/story");
const User = require("../models/user");

// Stories Index
router.get('/', (req, res) => {
  Story.find({status: "public"}).sort({ createdAt: -1 })
  .populate("User")
  .then(stories => {
    res.render('stories/index', {
      truncate: require("../helpers/ejs"),
      stripTags: require("../helpers/ejs"),
      stories});
  })
  .catch( err => console.log(err));
});

// add story
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

//show single story
router.get("/show/:id", (req, res) => {
  const id = req.params.id;
  Story.findById(id)
  .populate("User")
  .then(story => {
    res.render("stories/show", {story, User});
  })
  .catch(err => console.log(err));

  // Idea.findById(id)
  //   .then(idea => {
  //     if(idea.user != req.user.id){
  //       req.flash("error_msg", "Not Authorized");
  //       res.redirect("/ideas");
  //     } else {
  //       res.render("ideas/edit", {idea});
  //     }
  // })
});

// process Add storyRoute
router.post('/', (req, res) => {
  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments:allowComments,
    user: req.user.id
  }

  // Create Story
  new Story(newStory)
    .save()
    .then(story => {
      // res.redirect(`/stories/show/${story.id}`, {story});
      res.redirect(`/stories/show/${story.id}`);
    });
});


module.exports = router;
