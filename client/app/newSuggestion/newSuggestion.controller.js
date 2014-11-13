'use strict';

angular.module('idpMeetuplehApp')
  .controller('NewsuggestionCtrl', function ($scope, $timeout, $location, $stateParams, State, Place, Suggestion, $window) {
    $scope.back = function(){
      State.back();
    };

    $scope.searchParams = {
      price: 20
    };
    
    $scope.flags = {
      isSearching: false,
      searchLabel: 'Search',
      defaultHidden: State.search.suggestion
    };    

    $scope.results = [];    

    // Set default state if is back
    if (State.search.suggestion) {
      $scope.flags.isSearching = true;
      $scope.flags.searchDone = true;
      $scope.flags.searchLabel = 'New Search';      
      $scope.results = State.search.suggestion;
    }


    $scope.search = {
      price: 11
    };

    $scope.searchPlace = function(){
      var condition = !$scope.searchParams.keywords || !$scope.searchParams.price || !$scope.searchParams.area;
      condition = condition && !State.search.suggestion;
      if (condition) {
        $window.swal({
          title: "Oops!",
          text: "Make sure to fill out all search field!",
          type: 'warning',
          timer: 1500 
        });
        return;
      }

      $scope.flags.defaultHidden = false;
      $scope.flags.isSearching = !$scope.flags.isSearching;

      if ($scope.flags.isSearching) {
        // Store search state
        $scope.flags.searchLabel = 'Searching...';
        Place.search($scope.searchParams, function(places){          
          $scope.flags.searchDone = true;
          $scope.flags.searchLabel = 'New Search';

          $timeout(function(){            
            State.search.suggestion = places;
            $scope.results = places;

            if (places.length === 0) {
              $window.swal({
                title: "No Match!",
                text: "Try refining your search!",
                type: 'warning',
                timer: 2000 
              });

              $scope.searchPlace();
              return;
            };
          }, 670);
        });
      } else {
        // Clear search state
        delete State.search.suggestion;
        $scope.results = [];
        $scope.flags.searchDone = false;
        $scope.flags.searchLabel = 'Search';
      }
    };    

    $scope.selectArea = function(event){
      $scope.searchParams.area = 'Clarke Quay';
    };

    $scope.showDetails = function(place){
      $location.path('/place/' + $stateParams.activity + '/' + place._id);
    };

    $scope.getRatings = function(place){
      var score = 0;
      place.reviews.forEach(function(review){
        score += review.ratings;
      });

      return Math.round(score / place.reviews.length);
    };

    $scope.addSuggestion = function(event, place){
      event.preventDefault();
      event.stopPropagation();

      Suggestion.addSuggestion(State.eventState.active, $stateParams.activity, place._id)
        .then(function(){
          $location.path('/suggestion/list/' + $stateParams.activity);          
        });
    };
  });
