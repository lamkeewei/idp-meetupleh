'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventTime', {
        url: '/event/time/:id',
        templateUrl: 'app/eventTime/eventTime.html',
        controller: 'EventtimeCtrl',
        resolve: {
          timings: ['$stateParams', 'Time', function($stateParams, Time){
            return Time.getEventTimes($stateParams.id).$loaded();
          }],

          availabilities: ['$stateParams', 'Time', function($stateParams, Time){
            return Time.getUserAvailabilities($stateParams.id).$loaded();
          }],

          event: ['Event', '$stateParams', function(Event, $stateParams){
            return Event.getEvent($stateParams.id).$loaded();
          }]
        }
      });
  });