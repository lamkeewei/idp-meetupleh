'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  category: String,
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
  ],
  tags: [String]
});

module.exports = mongoose.model('Place', PlaceSchema);