const mongoose = require('mongoose');

// Define a User Schema. It will map to a collection (with the shape specified here)
const MarkerSchema = new mongoose.Schema({ 
    AssoID: {
      type: String,
      require: true
    },
    Latitude: {
      type: Number,
      required: true
    },
    Longitude: {
      type: Number,
      required: true
    },
    Status : {
      type: Boolean,
      require: true
    }
  });
  
  const Marker =  mongoose.model('marker', MarkerSchema);
  module.exports = Marker;