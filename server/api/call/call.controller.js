'use strict';

var _ = require('lodash');
var Call = require('./call.model');
var Handlebars = require('handlebars');
var plivo = require('plivo');
var Firebase = require('firebase');
var api = plivo.RestAPI({
  authId: 'MAZGIZNJY0NDIZZJJKNZ',
  authToken: 'NzNiOTIzMjlkMTFmMmRhZGExZmE4NTY0ODlmYzEy'
});

// Get list of calls
exports.index = function(req, res) {
  Call.find(function (err, calls) {
    if(err) { return handleError(res, err); }
    return res.json(200, calls);
  });
};

exports.getCall = function(req, res){
  var callDetails = req.body;

  if (callDetails.CallStatus === 'no-answer') {
    var ref = new Firebase('http://idp-meetupleh.firebaseio.com/bootstrap/' + req.params.eventId + '/' + req.params.userId);
    ref.set(2);
  }

  var source = '<Response> \
                  <GetDigits numDigits="1" action="http://idp-meetupleh.herokuapp.com/api/calls/receive/{{userId}}/{{eventId}}" method="POST"> \
                      <Speak>Hello, you have been invited for an outing titled, {{title}}. Press 1 to confirm your attendance or press 2 to reject the invitation.</Speak> \
                  </GetDigits> \
              </Response>';

  var context = { 
    title: req.params.title,
    userId: req.params.userId,
    eventId: req.params.eventId
  };

  var template = Handlebars.compile(source);
  var output = template(context);

  res.set('Content-Type', 'text/xml');
  res.send(output);
};

exports.makeCall = function (req, res) {
  var number = req.params.number;
  var eventId = req.params.eventId;
  var userId = req.params.userId;
  var title = req.params.title;

  var from = '';
  var url = 'http://idp-meetupleh.herokuapp.com/api/calls/get/' + title + '/' + userId + '/' + eventId;

  var params = {
    from: '6531584138',
    to: number,
    answer_url: url
  };

  api.make_call(params, function(status, response) {
    res.json(status, response);
  });
};

exports.receiveCall = function (req, res) {  
  var eventId = req.params.eventId;
  var userId = req.params.userId;

  var ref = new Firebase('http://idp-meetupleh.firebaseio.com/bootstrap/' + eventId + '/' + userId);
  if (!req.body.Digits) {
    ref.set(2);
  }
  
  var answer = Number(req.body.Digits);

  if (answer === 1) {
    console.log('accept');
    ref.set(1);
  } else if (answer === 2) {
    console.log('rejected');
    ref.set(3)
  }

  res.set('Content-Type', 'text/xml');
  res.send('<Response><Speak>Your response has been recorded. Thank you!</Speak></Response>');
};

// Get a single call
exports.show = function(req, res) {
  Call.findById(req.params.id, function (err, call) {
    if(err) { return handleError(res, err); }
    if(!call) { return res.send(404); }
    return res.json(call);
  });
};

// Creates a new call in the DB.
exports.create = function(req, res) {
  Call.create(req.body, function(err, call) {
    if(err) { return handleError(res, err); }
    return res.json(201, call);
  });
};

// Updates an existing call in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Call.findById(req.params.id, function (err, call) {
    if (err) { return handleError(res, err); }
    if(!call) { return res.send(404); }
    var updated = _.merge(call, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, call);
    });
  });
};

// Deletes a call from the DB.
exports.destroy = function(req, res) {
  Call.findById(req.params.id, function (err, call) {
    if(err) { return handleError(res, err); }
    if(!call) { return res.send(404); }
    call.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}