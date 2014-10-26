'use strict';

angular.module('idpMeetuplehApp')
  .controller('PlaceCtrl', function ($scope, $location, State, place, $stateParams, Suggestion) {
    $scope.place = place;

    $scope.back = function(){
      State.back();
    };

    $scope.addSuggestion = function(){
      Suggestion.addSuggestion(State.eventState.active, $stateParams.activity, $scope.place._id)
        .then(function(){
          $location.path('/suggestion/list/' + $stateParams.activity);          
        });
    };

    var mapOptions = {
      center: { lat: $scope.place.location.lat, lng: $scope.place.location.lng },
      zoom: 17,
      disableDefaultUI: true,
      draggable: false
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: mapOptions.center,
      map: map      
    });

    $scope.getRatings = function(place){
      var score = 0;
      place.reviews.forEach(function(review){
        score += review.ratings;
      });

      return score / place.reviews.length;
    };

    $scope.getFirstCharacter = function(str){
      return str.charAt(0);
    };

    $scope.fmtContact = function(contact){
      var first = contact.substring(0, 4);
      var second = contact.substring(4);

      return first + ' ' + second;
    };
  });
