'use strict';

angular.module('idpMeetuplehApp')
  .controller('EventtimeCtrl', function ($scope, $location, Time, timings, $timeout, $materialDialog, $stateParams, $rootScope, availabilities, event, Event) {        
    $scope.event = event;
    $scope.availabilities = availabilities;
    $scope.timings = timings;

    $scope.message = 'Hello';

    $scope.timeslot = {};

    $scope.flags = {
      hide: true,
      hideMain: false
    };

    $scope.back = function(){
      $location.path('/event/id/' + $stateParams.id);
    };

    $scope.isOrganizer = function(){
      return $scope.event.organizer === $rootScope.currentUser.$id;
    };

    $scope.getTimeslotAvailable = function(timing){
      var availabilities = $scope.availabilities[timing.$id];

      if (!availabilities) {
        return 0;
      }      

      var count = 0;
      Object.keys(availabilities).forEach(function(key, i){
        if (availabilities[key] === 'yes') {
          count++;
        }
      });

      return count;
    };

    $scope.sortTime = function(timing){
      var time = $scope.getTime(timing);
      var val = 0;

      switch(time) {
        case 'morning':
          val = 1;
          break;
        case 'afternoon':
          val = 2;
          break;
        case'evening':
          val = 3;
          break;
      }

      return Number($scope.getDay(timing)) + val;
    };

    $scope.getDay = function(timing) {
      return timing.$id.split('-')[0];
    };

    $scope.addNewTimeslot = function(){
      if ($scope.timeslot.day && $scope.timeslot.time) {        
        Time.addTimeslot($stateParams.id, $scope.timeslot);
        $scope.cancel();
      }
    };

    $scope.getUserAvailability = function(timing, available){
      var availability = $scope.availabilities[timing.$id];

      if(!availability) {
        return 0;
      }

      availability = availability[$rootScope.currentUser.$id];

      if (availability === 'yes') {
        return 1;
      } else if (availability === 'no') {
        return -1;
      }
    };

    $scope.setAvailability = function (timeslot, available) {      
      var userAvailability;

      if ($scope.getUserAvailability(timeslot) === 1) {
        userAvailability = 'yes';
      } else if ($scope.getUserAvailability(timeslot) === -1) {
        userAvailability = 'no';
      }      

      if (userAvailability === available) {
        return Time.removeUserAvailability($stateParams.id, timeslot.$id, $rootScope.currentUser.$id);        
      }

      Time.setAvailability($stateParams.id, timeslot.$id, $rootScope.currentUser.$id, available);
      timeslot.available = available;
    };

    $scope.getTime = function(timing) {
      return timing.$id.split('-')[1];
    };

    $scope.addTimeslot = function(){
      var toolbar = document.getElementById('time-slot-toolbar');
      angular.element(toolbar).addClass('unhide');
      $scope.flags.hideMain = true;

      $timeout(function(){
        $scope.flags.hide = false;
      }, 450);
    };

    $scope.cancel = function() {
      $scope.flags.hide = true;
      $scope.timeslot = {};

      $timeout(function(){
        var toolbar = document.getElementById('time-slot-toolbar');
        angular.element(toolbar).removeClass('unhide');        
      }, 200);

      $timeout(function(){
        $scope.flags.hideMain = false;
      }, 550);
    }

    $scope.chooseTime = function(event){
      $materialDialog.show({
        templateUrl: 'app/eventTime/modal.html',
        targetEvent: event,
        controller: ['$scope', '$materialDialog', function($scope, $materialDialog) {
          $scope.hide = function(){
            $materialDialog.hide();
          };

          $scope.close = function(time){
            $materialDialog.hide(time);
          };
        }]
      }).then(function(answer){
        $scope.timeslot.time = answer;
      });
    };

    $scope.chooseDate = function(event){
      $scope.$evalAsync(function(){
        document.getElementById('hidden-date').click();
      });
      
    };

    $scope.hide = function(){      
      $materialDialog.hide();
    };

    $scope.confirmSlot = function(timing){
      if (timing.$value) {
        Event.unconfirm(timing, $stateParams.id);
        return;
      }

      timing.$value = true;
      Event.confirmSlot($scope.timings, timing, $stateParams.id);
    };
  });
