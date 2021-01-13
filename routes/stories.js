const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = require("../models/story");
const User = require("../models/user");
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");


// Stories Index
router.get('/', (req, res) => {
  Story.find({status: "public"}).sort({ createdAt: -1 })
  .populate("user")
  .then(stories => {
    res.render('stories/index', {
      truncate: require("../helpers/ejs"),
      stripTags: require("../helpers/ejs"),
      editIcon: require("../helpers/ejs"),
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
  .populate("user")
  .populate("comments.commentUser")
  .then(story => {
    res.render("stories/show"
    , {
      formatDate: require("../helpers/ejs"),
      editIcon: require("../helpers/ejs"),
      story}
  );
  })
  .catch(err => console.log(err));
});

  // Edit story
  router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Story.findOne({_id: id})
    .then(story => {
      if (stories.user != req.params.id) {
        res.redirect("/stories");
      } else {
        res.render("stories/edit", {story
          // select: require("../helpers/ejs")
          });
      }
    })
    .catch(err => console.log(err));
  });

  router.put("/:id", (req,res) => {
    mongoose.set('returnOriginal', false);
    const id = req.params.id;
    let allowComments;

    if(req.body.allowComments){
      allowComments = true;
    } else {
      allowComments = false;
    }
    Story.findByIdAndUpdate(id, { $set:{
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: allowComments,
      user: req.user.id
    }})
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
  })

  router.delete("/:id", (req,res) => {
    Story.findByIdAndDelete({id: req.params.id})
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
  });

  // Idea.findById(id)
  //   .then(idea => {
  //     if(idea.user != req.user.id){
  //       req.flash("error_msg", "Not Authorized");
  //       res.redirect("/ideas");
  //     } else {
  //       res.render("ideas/edit", {idea});
  //     }
  // })

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
    allowComments: allowComments,
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

// Post Comment
router.post('/comment/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    }

    // Add to comments array
    story.comments.unshift(newComment);

    story.save()
      .then(story => {
        res.redirect(`/stories/show/${story.id}`);
      });
  });
});


module.exports = router;
