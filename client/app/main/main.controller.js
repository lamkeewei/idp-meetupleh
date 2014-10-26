'use strict';

angular.module('idpMeetuplehApp')
  .controller('MainCtrl', function ($scope, userMD5, $materialSidenav, $location, events, State) {    
    $scope.events = events;
    State.bootstrap.shown = false;

    $scope.flags = {
      tabIndex: 0
    };

    $scope.getSubheader = function(){
      switch($scope.flags.tabIndex) {
        case 0:
          return 'Upcoming Events';
        case 1: 
          return 'Notifications';
      }
    };

    $scope.toggleLeft = function() {
      $materialSidenav('left').toggle();
    };

    $scope.addNewEvent = function(){
      $location.path('/event/new')
    };
  });
