'use strict';

angular.module('idpMeetuplehApp')
  .controller('MainCtrl', function ($scope, $materialSidenav, $location) {
    $scope.events = [
      {
        date: {
          day: 15,
          month: 'October'
        },
        title: 'Primary School Gathering',
        organizer: 'You'
      }, {
        date: {
          day: 30,
          month: 'October'
        },
        title: 'Thomas Birthday Party',
        organizer: 'Thomas'
      }, {
        date: {
          day: 4,
          month: 'November'
        },
        title: 'Food Trail',
        organizer: 'You'
      }
    ];

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
