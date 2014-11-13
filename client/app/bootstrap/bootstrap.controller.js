'use strict';

angular.module('idpMeetuplehApp')
  .controller('BootstrapCtrl', function ($scope, $rootScope, $location, $timeout, places, event, Call, Suggestion, $stateParams, Event, bootstrap, Bootstrap) {    

    $scope.bootstrap = bootstrap;

    $scope.places = places;
    $scope.event = event;

    $scope.flags = {};

    $scope.back = function(){
      $location.path('/');
    };

    $scope.search = function(){
      $scope.flags.searchDone = true;
    };

    $scope.next = function(place){
      swal({
        title: "Calling Friends Now",
        text: "We'll hound them for you!",
        type: 'success',
        closeOnCancel: true,
        closeOnConfirm: true,
        timer: 2000
      });

      $timeout(function(){
        Suggestion.addSuggestion($stateParams.id, 1, place._id)
          .then(function(){
            Event.setBootstrap($stateParams.id, 2);

            $scope.bootstrap.forEach(function(user){
              Call.get({
                eventId: $stateParams.id,
                title: event.title,
                userId: user.$id,
                number: user.user.phone                
              });
            });
          });
      }, 2300);      
    };

    $scope.allCompleted = function () {
      var calling = 0;

      bootstrap.forEach(function(b){
        if (b.$value === 0) {
          calling++;
        }
      });

      return calling === 0;
    };

    $scope.getStatus = function (status) {
      var text = '';
      switch(status){
        case 0:
          text = 'Calling...';
          break;
        case 1:
          text = 'Confirmed';
          break;
        case 2:
          text = 'No reply';
          break;
        case 3:
          text = 'Not attending';
          break;
      }

      return text;
    };

    $scope.complete = function(){
      swal({ 
        title: 'Update Attendance?', 
        text: 'Drop attendees that has indicated they are not attending?',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#F27474', 
        confirmButtonText: 'Yes, drop them!', 
        cancelButtonText: "Nope, give chance!",
        closeOnConfirm: false,
        closeOnCancel: true 
      }, function(isConfirm) {
        if (isConfirm) {
          swal({
            title: "Dropped!",
            timer: '1400',
            type: 'success'
          });

          $timeout(function() {
            Bootstrap.drop(bootstrap, $stateParams.id);            
          }, 1700);
        } else {
          Bootstrap.finish($stateParams.id);
        }

        $location.path('/event/' + $stateParams.id);
      });
    };
  });
