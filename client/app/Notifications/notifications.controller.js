'use strict';

angular.module('idpMeetuplehApp')
  .controller('NotificationsCtrl', function ($scope, $timeout, $materialSidenav, Notifications, $stateParams, $rootScope, $location) {
    $rootScope.$on('load-notification', function(event, eventId){                 
      Notifications.getEventNotifications(eventId).$loaded().then(function(notifications){
        $scope.notifications = notifications;
        $rootScope.newNotification = $scope.hasNewNotification();        

        notifications.$watch(function(event){
          $rootScope.newNotification = $scope.hasNewNotification();
          if ($rootScope.newNotification) {
            $scope.playSound();
          }
        });
      });      
    });

    $rootScope.$on('open-notification', function(event, eventId){
      $timeout(function(){
        if ($scope.notifications) {          
          $scope.notifications.forEach(function(n){
            Notifications.setSeen(n, eventId);
          });    
        }      
      }, 1000);
    });

    $scope.close = function(){
      $materialSidenav('right').toggle();
    };

    $scope.playSound = function(){
      document.getElementById('audio').innerHTML='<audio id="notification-sound" preload="auto"><source src="https://s3-ap-southeast-1.amazonaws.com/idp-meetupleh/hangouts_message.ogg" type="audio/ogg"></audio>';
      document.getElementById('notification-sound').play();
    };

    $scope.hasNewNotification = function(){
      var newNotification = 0;

      $scope.notifications.forEach(function(n){
        if (!n.isSeen) {
          newNotification++;
        }
      });

      return newNotification > 0;
    };

    $scope.processNewVoteText = function(notification){        
        var voteUpOrDown = notification.vote > 0 ? 'up' : 'down';
        var text = notification.user.firstName + ' voted ' + voteUpOrDown + ' a suggestion.';
        return text;
      };

      $scope.getFirstCharacter = function(notification){
        return notification.user.firstName.charAt(0);
      };

      $scope.goToNotification = function(notification){
        switch(notification.type){
          case 'new-vote':
            $location.path('/suggestion/list/' + notification.activity);
            break;
        }

        $materialSidenav('right').toggle();
      };

      $scope.getText = function (notification) {
        var text = '';

        switch(notification.type) {
          case 'new-vote':
            text = $scope.processNewVoteText(notification);
            break;
          case 'new-event':
            break;
          case 'new-timeslot':
            break;
        }

        return text;
      };
  });
