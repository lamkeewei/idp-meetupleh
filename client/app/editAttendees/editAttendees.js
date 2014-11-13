'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editAttendees', {
        url: '/event/:id/attendees',
        templateUrl: 'app/editAttendees/editAttendees.html',
        controller: 'EditattendeesCtrl',
        resolve: {
          attendees: ['Event', '$stateParams', function(Event, $stateParams){
            return Event.getEventAttendeesFull($stateParams.id);
          }],
          
          event: ['Event', '$stateParams', function(Event, $stateParams){
            return Event.getEvent($stateParams.id).$loaded();
          }]
        }
      });
  });