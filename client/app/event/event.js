'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider      
      .state('event', {
        url: '/event/id/:id',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl',
        resolve: {
          event: ['Event', '$stateParams', function(Event, $stateParams){
            return Event.getEvent($stateParams.id).$loaded();
          }]
        }
      });
  });