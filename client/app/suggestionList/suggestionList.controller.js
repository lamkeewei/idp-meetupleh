'use strict';

angular.module('idpMeetuplehApp')
  .controller('SuggestionlistCtrl', function ($scope, $location) {
    $scope.search = {};

    $scope.back = function(){
      $location.path('/event');
    };

    $scope.openOverlay = function() {      
      var overlay = document.getElementById('comments-overlay');
      overlay.style.top = '0vh';
    };

    $scope.closeOverlay = function() {      
      var overlay = document.getElementById('comments-overlay');
      overlay.style.top = '100vh';
    };

    $scope.suggestions = [
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
      }
    ];
  });
