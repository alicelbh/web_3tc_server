const mongoose = require('mongoose');

// Define a User Schema. It will map to a collection (with the shape specified here)
const CommentSchema = new mongoose.Schema({ 
    content:{
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    asso : {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true,
    }
  });
  
  const Comment =  mongoose.model('comment', CommentSchema);
  module.exports = Comment;