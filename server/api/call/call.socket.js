/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Call = require('./call.model');

exports.register = function(socket) {
  Call.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Call.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('call:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('call:remove', doc);
}