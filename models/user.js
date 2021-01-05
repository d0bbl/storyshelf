const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  Image:{
    type: String,
  }
},   { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
