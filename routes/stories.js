const express = require('express');
const router = express.Router();
const Story = require("../models/story");
const User = require("../models/user");

// Sories Index
router.get('/', (req, res) => {
  res.render('stories/index');
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
      res.redirect(`/stories/show/${story.id}`);
    });
});


module.exports = router;
