'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('place', {
        url: '/place/:activity/:id',
        templateUrl: 'app/place/place.html',
        controller: 'PlaceCtrl',
        resolve: {
          place: ['Place', '$stateParams', function(Place, $stateParams) {
            return Place.get({id: $stateParams.id}).$promise;
          }]
        }
      });
  });