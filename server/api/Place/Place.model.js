'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  address: String,
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number
  },  
  reviews: [
    {
      name: String,
      ratings: Number,
      review: String
    }
  ]
});

module.exports = mongoose.model('Place', PlaceSchema);