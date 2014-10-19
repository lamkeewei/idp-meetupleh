'use strict';

angular.module('idpMeetuplehApp')
  .controller('EventCtrl', function ($scope, $location, $window, State) {
    State.reset();
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
      element.offsetWidth;

      if (!ticking) {
        ticking = true;
        $window.requestAnimationFrame(function(){
          element.style.webkitTransform =  'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)';
          ticking = false;
        });        
      }
    };

    $scope.newSuggestion = function(){
      $location.path('/suggestion/new');
    };

    $scope.changeAttendees = function(){
      $location.path('/event/new');
    };
  });
