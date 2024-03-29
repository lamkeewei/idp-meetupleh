'use strict';

var _ = require('lodash');
var Place = require('./Place.model');

// Get list of Places
exports.index = function(req, res) {
  Place.find(function (err, Places) {
    if(err) { return handleError(res, err); }
    return res.json(200, Places);
  });
};

// Get a single Place
exports.show = function(req, res) {
  Place.findById(req.params.id, function (err, Place) {
    if(err) { return handleError(res, err); }
    if(!Place) { return res.send(404); }
    return res.json(Place);
  });
};

// Creates a new Place in the DB.
exports.create = function(req, res) {
  Place.create(req.body, function(err, Place) {
    if(err) { return handleError(res, err); }
    return res.json(201, Place);
  });
};

// Updates an existing Place in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Place.findById(req.params.id, function (err, Place) {
    if (err) { return handleError(res, err); }
    if(!Place) { return res.send(404); }
    var updated = _.merge(Place, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Place);
    });
  });
};

// Deletes a Place from the DB.
exports.destroy = function(req, res) {
  Place.findById(req.params.id, function (err, Place) {
    if(err) { return handleError(res, err); }
    if(!Place) { return res.send(404); }
    Place.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.search = function (req, res) {
  var query = req.body;
  var keywords = query.keywords.toLowerCase().split(' ');

  Place
    .find({
      'price.min': { $lt: query.price }
    }, function(err, places){
      if(err) { return handleError(res, err); }
      places = _.filter(places, function(place){
        var match = false;
        var placeTags = place.tags;

        placeTags.forEach(function(tag){
          keywords.forEach(function(word){
            if (_.contains(tag, word)) {
              match = true;
            }
          });
        });

        if (_.contains(place.name.toLowerCase(), query.keywords.toLowerCase())) {
          match = true;
        }

        return match;
      });

      return res.json(200, places);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}