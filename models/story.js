const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const storySchema = new Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  status: {
    type: String,
    default:'public'
  },
  allowComments: {
    type: Boolean,
    default:true
  },
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate:{
      type: Date,
      default: Date.now
    },
    commentUser:{
      type: Schema.Types.ObjectId,
      ref:'User'
    }
  }],
  user:{
    type: Schema.Types.ObjectId,
    ref:'User'
  }
},
  {timestamps: true});

// Create collection and add schema
const Story = mongoose.model('Story', storySchema);
module.exports = Story;
