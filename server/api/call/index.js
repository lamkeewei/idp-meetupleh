'use strict';

var express = require('express');
var controller = require('./call.controller');

var router = express.Router();


router.post('/receive/:userId/:eventId', controller.receiveCall);
router.get('/receive/:userId/:eventId', controller.receiveCall);

router.post('/get/:title/:userId/:eventId', controller.getCall);
router.get('/get/:title/:userId/:eventId', controller.getCall);


router.get('/make/:number/:title/:userId/:eventId', controller.makeCall);

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;