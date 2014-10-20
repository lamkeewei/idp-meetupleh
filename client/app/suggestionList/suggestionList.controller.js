'use strict';

angular.module('idpMeetuplehApp')
  .controller('SuggestionlistCtrl', function ($scope, $q, $location, State, suggestions, userMD5, Vote, $stateParams) {      
    $scope.search = {
      details: ''
    };

    $scope.back = function(){
      State.back();
    };

    $scope.openOverlay = function() {      
      var overlay = document.getElementById('comments-overlay');
      overlay.style.top = '0vh';
    };

    $scope.closeOverlay = function() {      
      var overlay = document.getElementById('comments-overlay');
      overlay.style.top = '100vh';
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

    $scope.sortVotes = function(place){
      return -1 * $scope.getVotes(place);
    };

    $scope.upVote = function(place){
      if (place.userVote.$value === 1) {
        Vote.removeVote(State.eventState.active, $stateParams.activity, place.details._id, userMD5);
        return;
      }

      Vote.addVote(State.eventState.active, $stateParams.activity, place.details._id, userMD5, 1);
      place.userVote.$value = 1;
    };

    $scope.downVote = function(place){
      if (place.userVote.$value === -1) {
        Vote.removeVote(State.eventState.active, $stateParams.activity, place.details._id, userMD5);
        return;
      }

      Vote.addVote(State.eventState.active, $stateParams.activity, place.details._id, userMD5, -1);
      place.userVote.$value = -1;
    };    

    $scope.suggestions = suggestions;


  });
