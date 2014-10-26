'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bootstrap', {
        url: '/bootstrap/:id',
        templateUrl: 'app/bootstrap/bootstrap.html',
        controller: 'BootstrapCtrl',
        resolve: {
          places: ['Place', function(Place){
            return  Place.query().$promise;
          }],

          event: ['Event', '$stateParams', function(Event, $stateParams){
            return Event.getEvent($stateParams.id).$loaded();
          }],

          bootstrap: ['Bootstrap', '$stateParams', function(Bootstrap, $stateParams){
            return Bootstrap.getBootstrap($stateParams.id);
          }]
        }
      });
  });