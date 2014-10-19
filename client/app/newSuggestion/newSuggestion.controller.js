'use strict';

angular.module('idpMeetuplehApp')
  .controller('NewsuggestionCtrl', function ($scope, $timeout, $location, $stateParams, State) {
    $scope.back = function(){
      $location.path('/event');
    };
    
    $scope.flags = {
      isSearching: false,
      searchLabel: 'Search',
      defaultHidden: State.search.suggestion
    };    

    // Set default state if is back
    if (State.search.suggestion) {
      $scope.flags.isSearching = true;
      $scope.flags.searchDone = true;
      $scope.flags.searchLabel = 'New Search';      
    }

    $scope.results = [
      {
        name: 'Brotzeit',
        address: '1 Fullerton Rd, #02-02/03/04',
        ratings: 4,
        imageUrl: 'http://www.asia-bars.com/wp-content/uploads/2011/10/brotzeit0081.jpg'
      },
      {
        name: 'Timbre',
        address: '#01-04, The Arts House At Old Parliament',
        ratings: 3,
        imageUrl: 'http://blog.wearespaces.com/wp-content/uploads/2013/09/timbreartshouse.jpg'
      },
    ];    

    $scope.search = {
      price: 11
    };

    $scope.searchPlace = function(){
      $scope.flags.defaultHidden = false;
      $scope.flags.isSearching = !$scope.flags.isSearching;

      if ($scope.flags.isSearching) {
        // Store search state
        State.search.suggestion = $scope.search;

        $scope.flags.searchLabel = 'Searching...';
        $timeout(function(){
          $scope.flags.searchDone = true;
          $scope.flags.searchLabel = 'New Search';
        }, 2000);
      } else {
        // Clear search state
        delete State.search.suggestion;

        $scope.flags.searchDone = false;
        $scope.flags.searchLabel = 'Search';
      }
    };    

    $scope.selectArea = function(event){
      $scope.search.area = 'Clarke Quay';
    };

    $scope.showDetails = function(){
      $location.path('/place');
    };

    $scope.addSuggestion = function(event){
      event.preventDefault();
      event.stopPropagation();

      $location.path('/suggestion/list')
    };
  });
