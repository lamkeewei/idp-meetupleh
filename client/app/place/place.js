'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('place', {
        url: '/place',
        templateUrl: 'app/place/place.html',
        controller: 'PlaceCtrl'
      });
  });