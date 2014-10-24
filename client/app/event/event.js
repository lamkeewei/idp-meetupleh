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
          }],

          activityOne: ['Suggestion', '$stateParams', function(Suggestion, $stateParams){
            return Suggestion.getSuggestions($stateParams.id, 1);
          }],

          activityTwo: ['Suggestion', '$stateParams', function(Suggestion, $stateParams){
            return Suggestion.getSuggestions($stateParams.id, 2);
          }],

          activityThree: ['Suggestion', '$stateParams', function(Suggestion, $stateParams){
            return Suggestion.getSuggestions($stateParams.id, 3);
          }],

          timings: ['Time', '$stateParams', function(Time, $stateParams){
            return Time.getUserAvailabilitiesArr($stateParams.id).$loaded();
          }]
        }
      });
  });