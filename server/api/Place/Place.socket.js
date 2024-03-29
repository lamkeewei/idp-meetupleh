/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Place = require('./Place.model');

exports.register = function(socket) {
  Place.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Place.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('Place:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('Place:remove', doc);
}