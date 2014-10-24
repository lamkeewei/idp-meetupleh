'use strict';

angular.module('idpMeetuplehApp')
  .service('Notifications', function ($rootScope) {

    this.initialize = function(){      
      $rootScope.$on('notification', function(event, type, notification){
        notification.user = $rootScope.currentUser.name;
        notification.timestamp = new Date().getTime();
        notification.type = type;
        notification.userId = $rootScope.user.$id;

        console.log(notification);
      });
    };
  });
