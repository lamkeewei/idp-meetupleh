'use strict';

angular.module('idpMeetuplehApp')
  .controller('EventCtrl', function ($scope, Event, Bootstrap, $timeout, $materialSidenav, $filter, $location, $window, State, $stateParams, event, activityOne, activityTwo, activityThree, timings, $rootScope) {    
    State.reset();        
    if (event.bootstrap) {
      return $location.path('/bootstrap/' + $stateParams.id);
    }

    $rootScope.$emit('load-notification', $stateParams.id);
    $scope.event = event;
    $scope.timings = timings;
    $scope.time = 'Time';

    $scope.activities = {
      one: activityOne,
      two: activityTwo,
      three: activityThree
    };

    $scope.getBudget = function(){
      var min = 0;
      var max = 0;

      if ( $scope.activities.one.length > 0) {
        var min = $scope.activities.one[0].details.price.min;        
        var max = $scope.activities.one[0].details.price.max;
      }

      if ( $scope.activities.two.length > 0) {
        var min = $scope.activities.two[0].details.price.min;        
        var max = $scope.activities.two[0].details.price.max;
      }

      if ( $scope.activities.three.length > 0) {
        var min = $scope.activities.three[0].details.price.min;        
        var max = $scope.activities.three[0].details.price.max;
      }
      
      return '$' + min + ' - ' + max;
    };

    $scope.needHelp = function(){
      var condition = $scope.activities.one.length === 0 
        && $scope.activities.two.length === 0 
        && $scope.activities.three.length === 0;

      var threeDaysLater = $window.moment().add(3, 'days').toDate().getTime();
      var min = Number.MAX_VALUE;

      Object.keys($scope.event.date).forEach(function(t){        
        var time = Number(t.split('-')[0]);
        if (time < min) {
          min = time;
        }
      });

      var condition = condition && threeDaysLater >= min;

      if (condition && !State.bootstrap.shown) {
        swal({ 
          title: 'Fix Your Outing?', 
          text: 'Your outing looks a bit stale and time is running out!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ffc107', 
          confirmButtonText: 'Yes, save me!', 
          cancelButtonText: "Nope, I'm fine!",
          closeOnConfirm: false,
          closeOnCancel: true 
        }, function(isConfirm) {           
          State.bootstrap.shown = true;

          if (isConfirm) {
            swal({
              title: "Let's go!",
              timer: '1400',
              type: 'success'
            });

            $timeout(function() {
              Event.setBootstrap($stateParams.id, 1).then(function(){
                Bootstrap.intialize($stateParams.id);
                
                $location.path('/bootstrap/' + $stateParams.id);                
              });
            }, 1700);
          }
        });
      }
    };

    $scope.needHelp();

    $scope.showNotification = function(){      
      $rootScope.$emit('open-notification', $stateParams.id);
      $materialSidenav('right').toggle();
    };

    $scope.getMostCount = function(){
      var max = 0;
      $scope.timings.forEach(function(t){
        var count = $scope.getTimeCount(t);

        if (count > max) {
          max = count;
        } 
      });

      return max;
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
          Object.keys(t).forEach(function(key){
            if (t[key] === 'yes') {
              count++;
            }
          });
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
      $location.path('/event/' + $stateParams.id + '/attendees');
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

    $scope.getConfirmedDate = function(){
      var date = '-';
      Object.keys($scope.event.date).forEach(function(key){
        var value = $scope.event.date[key];

        if (value) {
          var dateStr = Number(key.split('-')[0]);
          $scope.time = key.split('-')[1];
          date = $filter('date')(dateStr, 'd MMM');
        }
      });

      if (date === '-') {
        $scope.time = 'Time';
      }

      return date;
    };
  });
