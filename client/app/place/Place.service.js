'use strict';

angular.module('idpMeetuplehApp')
  .factory('Place', function ($resource) {
    return $resource('/api/places/:id:action', {}, {
      search: {
        params: {
          action: 'search'
        },
        method: 'POST',
        isArray: true
      }
    });
  });
