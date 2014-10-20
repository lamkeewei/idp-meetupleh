'use strict';

angular.module('idpMeetuplehApp')
  .controller('EventCtrl', function ($scope, $location, $window, State, event) {    
    State.reset();
    $scope.event = event;
    
    $scope.getAttendeesCount = function(){
      return Object.keys($scope.event.attendees).length;
    };

    $scope.back = function(){
      State.back();
    };
    
    $scope.message = 'Hello';
    var transform = {};
    var ticking = false;

    $scope.pan = function(event){
      transform.translate = {
          x: event.deltaX,
          y: event.deltaY
      };
      var element = event.target;

      if (!ticking) {
        ticking = true;
        $window.requestAnimationFrame(function(){
          element.style.webkitTransform =  'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)';
          ticking = false;
        });        
      }
    };    

    $scope.newSuggestion = function(activity){
      $location.path('/suggestion/new/' + activity);
    };

    $scope.changeAttendees = function(){
      $location.path('/event/new');
    };
  });
