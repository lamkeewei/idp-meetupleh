'use strict';

angular.module('idpMeetuplehApp')
  .controller('EventCtrl', function ($scope, $filter, $location, $window, State, $stateParams, event, activityOne, activityTwo, activityThree, timings) {    
    State.reset();        
    $scope.event = event;
    $scope.timings = timings;

    $scope.activities = {
      one: activityOne,
      two: activityTwo,
      three: activityThree
    };

    $scope.getVotes = function (place) {
      if (place.votes && place.votes.length > 0) {
        var score = 0;
        place.votes.forEach(function(vote){
          score += vote.$value;
        });
        return score;
      } else {
        return 0;
      }
    };

    $scope.getTimeCount = function(timing){
      var count = 0;

      $scope.timings.forEach(function(t){
        if (t.$id === timing.$id) {
          count++;
        }
      });

      return count;
    };

    $scope.sortVotes = function(place){
      return -1 * $scope.getVotes(place);
    };

    $scope.getMostPopular = function(activities){
      var sorted = $filter('orderBy')(activities, $scope.sortVotes, false);
      return sorted[0];
    };
    
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

    $scope.showSuggestionList = function(activity) {
      $location.path('/suggestion/list/' + activity);
    }

    $scope.changeAttendees = function(){
      $location.path('/event/new');
    };

    $scope.isTied = function (activities) {
      if (activities.length > 1) {
        var first = $scope.getVotes(activities[0]);
        var second = $scope.getVotes(activities[1]);

        return first === second;
      } else {
        return false;
      }
    };

    $scope.setTime = function() {
      $location.path('/event/time/' + $stateParams.id);
    }

    $scope.getDate = function(timing){
      var arr = timing.$id.split('-');      

      return $filter('date')(arr[0], 'd MMM');
    };
  });
