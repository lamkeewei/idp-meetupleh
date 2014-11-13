'use strict';

angular.module('idpMeetuplehApp')
  .directive('eventCard', function ($location, $rootScope, $filter, State, $window, Event, Suggestion, Vote, Time, Notifications) {
    return {
      templateUrl: 'app/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        details: '='
      },
      link: function (scope, element, attrs) {
        scope.viewEvent = function(){
          State.eventState.active = scope.details.$id;
          $location.path('/event/id/' + scope.details.$id);
        };

        scope.isOrganizer = function(){
          return $rootScope.currentUser.$id === scope.details.organizer;
        };

        scope.getDate = function(){
          var date = '-';
          if (!scope.details.date) {
            return date;
          };

          Object.keys(scope.details.date).forEach(function(d, i){
            var selected = scope.details.date[d];
            if (selected) {
              date = Number(d.split('-')[0]);
            }
          });

          return date;
        };

        scope.deleteEvent = function (eventId) {
          // Drop all users;
          Object.keys(scope.details.attendees)
            .forEach(function(a){
              Event.dropUser(eventId, a);
              Notifications.deleteEventNotifications(a, eventId);
            });

          Suggestion.deleteEventSuggestion(eventId);
          Time.deleteEventAvailabilities(eventId);
          Vote.deleteEventVotes(eventId);
          Event.deleteEvent(eventId);
        };

        scope.delete = function(event){
          event.preventDefault();
          event.stopPropagation();

          if (scope.isOrganizer()) {
            $window.swal({
              title: "Delete event?",
              text: "You will not be able to recover this event!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false 
            }, function(isConfirm){
              if (isConfirm) {
                var eventId = scope.details.$id;              
                scope.deleteEvent(eventId);

                $window.swal({
                  title: "Deleted!", 
                  text: "This event has been deleted.", 
                  type: "success",
                  timer: 1500
                });             
              }
            });
          } else {
            $window.swal({
              title: "Leave event?",
              text: "Are you sure you want to miss out on all the fun?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, I am sure!",
              closeOnConfirm: false 
            }, function(isConfirm){
              if (isConfirm) {
                var eventId = scope.details.$id;              
                Event.dropUser(eventId, $rootScope.currentUser.$id);

                $window.swal({
                  title: "Left Event!", 
                  text: "You have left this event!", 
                  type: "success",
                  timer: 1500
                });             
              }
            });
          }
        };
      }
    };
  });