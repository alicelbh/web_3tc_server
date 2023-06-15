const mongoose = require('mongoose');

// Define a User Schema. It will map to a collection (with the shape specified here)
const UserSchema = new mongoose.Schema({ 
    username: {
      type: String,
      required: true
    },
    assoList:
      {
        type: [String],
        required: true,
      },
    google_id:
      {
        type: String,
        required: true,
      }
  });
  
  const User =  mongoose.model('user', UserSchema);
  module.exports = User;