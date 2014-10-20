/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Place = require('../api/Place/Place.model');

Place.find({}).remove(function() {
  Place.create({
    name: 'Brotzeit',
    address: '1 Fullerton Rd, #02-02/03/04',
    imageUrl: 'http://www.asia-bars.com/wp-content/uploads/2011/10/brotzeit0081.jpg',
    location: {
      lat: 1.28575953,
      lng: 103.8533318
    },  
    reviews: [
      {
        name: 'Jane',
        ratings: 4,
        review: 'Looks like a good place to go to'
      }, {
        name: 'Tom',
        ratings: 4,
        review: 'Looks like a good place to go to'
      }, 
    ]
  }, {
    name: 'Timbre',
    address: '#01-04, The Arts House At Old Parliament',
    imageUrl: 'http://blog.wearespaces.com/wp-content/uploads/2013/09/timbreartshouse.jpg',
    location: {
      lat: 1.28575953,
      lng: 103.8533318
    },  
    reviews: [
      {
        name: 'Jane',
        ratings: 4,
        review: 'Looks like a good place to go to'
      }, {
        name: 'Tom',
        ratings: 4,
        review: 'Looks like a good place to go to'
      }, 
    ]
  });
});

