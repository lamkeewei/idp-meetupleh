'use strict';

angular.module('idpMeetuplehApp')
  .controller('PlaceCtrl', function ($scope, $location) {
    $scope.back = function(){
      $location.path('/suggestion/new/back');
    };

    $scope.addSuggestion = function(){
      $location.path('/suggestion/list');
    };

    var mapOptions = {
      center: { lat: 1.28575953, lng: 103.8533318 },
      zoom: 17,
      disableDefaultUI: true,
      draggable: false
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: mapOptions.center,
      map: map      
    });

    $scope.reviews = [
      {
        name: 'Jane',
        ratings: 4,
        review: 'Great sausages here. Definitely will come back again!'
      }, {
        name: 'Jane',
        ratings: 4,
        review: 'Great sausages here. Definitely will come back again!'
      }, {
        name: 'Jane',
        ratings: 4,
        review: 'Great sausages here. Definitely will come back again!'
      }, {
        name: 'Jane',
        ratings: 4,
        review: 'Great sausages here. Definitely will come back again!'
      }
    ];
  });
