'use strict';

angular.module('idpMeetuplehApp')
  .controller('SuggestionlistCtrl', function ($scope, $filter, $q, $location, State, suggestions, $rootScope, Vote, $stateParams) {      
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

    $scope.getRank = function(suggestion){
      var sorted = $filter('orderBy')($scope.suggestions, $scope.sortVotes, false);

      var position = 0;

      sorted.forEach(function(p, i){        
        if (p.$id === suggestion.$id) {
          position = i + 1;
        }
      });

      return position;
    };

    $scope.addPlace = function () {
      console.log('/suggestion/new/' + $stateParams.activity);
      $location.path('/suggestion/new/' + $stateParams.activity);
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

    $scope.showDetails = function(suggestion){
      $location.path('place/' + $stateParams.activity + '/' + suggestion.details._id);
    };

    $scope.sortVotes = function(place){
      return -1 * $scope.getVotes(place);
    };

    $scope.upVote = function(place, event){
      event.stopPropagation();
      event.preventDefault();      
      if (place.userVote.$value === 1) {
        Vote.removeVote(State.eventState.active, $stateParams.activity, place.details._id, $rootScope.currentUser.$id);
        return;
      }

      Vote.addVote(State.eventState.active, $stateParams.activity, place.details._id, $rootScope.currentUser.$id, 1);
      place.userVote.$value = 1;
    };

    $scope.downVote = function(place, event){
      event.stopPropagation();
      event.preventDefault();
      if (place.userVote.$value === -1) {
        Vote.removeVote(State.eventState.active, $stateParams.activity, place.details._id, $rootScope.currentUser.$id);
        return;
      }

      Vote.addVote(State.eventState.active, $stateParams.activity, place.details._id, $rootScope.currentUser.$id, -1);
      place.userVote.$value = -1;
    };    

    $scope.suggestions = suggestions;


  });
