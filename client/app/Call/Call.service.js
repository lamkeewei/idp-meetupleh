'use strict';

angular.module('idpMeetuplehApp')
  .factory('Call', function ($resource) {
    return $resource('/api/calls/make/:number/:title/:userId/:eventId', {}, {});
  });
