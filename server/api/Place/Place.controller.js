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

function handleError(res, err) {
  return res.send(500, err);
}