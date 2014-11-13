'use strict';

angular.module('idpMeetuplehApp')
  .controller('EditattendeesCtrl', function ($scope, $materialDialog, $location, Event, $stateParams, attendees, event, $rootScope, FbUser) {
    $scope.attendees = attendees;
    $scope.event = event;

    $scope.back = function(){
      $location.path('/event/id/' + $stateParams.id);
    };

    $scope.getFirstChar = function(name) {
      if (!name) {
        return '';
      }
      
      return name.substring(0,1);
    }

    $scope.isOrganizer = function(user){
      return $scope.event.organizer === user.$id;
    };

    $scope.isCurrentOrganizer = function(){
      return $scope.event.organizer === $rootScope.currentUser.$id;
    };

    $scope.dropUser = function(user){
      return Event.dropUser($stateParams.id, user.$id);
    };

    $scope.add = function(event){
      $materialDialog.show({
        templateUrl: 'app/editAttendees/modal.html',
        targetEvent: event,
        controller: ['$scope', '$materialDialog', '$stateParams', 'FbUser', function($scope, $materialDialog, $stateParams, FbUser) {
          $scope.search = {};

          FbUser.getEventContacts($stateParams.id)
            .then(function(contacts){
              $scope.contacts = contacts;
            });

          $scope.add = function(contact){
            $materialDialog.hide(contact);
          };
        }]
      }).then(function(newContact){
        Event.addToEvent(newContact.$id, $stateParams.id);
        FbUser.addUserEvent(newContact.$id, $stateParams.id);
      });
    };
  });
