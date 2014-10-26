'use strict';

angular.module('idpMeetuplehApp')
  .service('Notifications', function ($rootScope, $window, Event, $firebase) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/notifications');

    this.saveNotification = function (notification, userId, eventId) {
      var ref = this.baseRef.child(userId).child(eventId);
      var sync = $firebase(ref);
      return sync.$push(notification);
    };

    this.setSeen = function(notification, eventId){      
      var ref = this.baseRef.child($rootScope.currentUser.$id).child(eventId).child(notification.$id).child('isSeen');
      return $firebase(ref).$set(true);
    };

    this.pushNotifications = function (notification) {
      var self = this;

      Event.getEvent(notification.eventId).$loaded().then(function(event){
        Object.keys(event.attendees).forEach(function(attendee){
          if (attendee !== notification.userId) {
            self.saveNotification(notification, attendee, notification.eventId);
          }
        }); 
      });
    };

    this.getEventNotifications = function(eventId){
      var ref = this.baseRef.child($rootScope.currentUser.$id).child(eventId);
      return $firebase(ref).$asArray();
    };

    this.initialize = function(){
      var self = this;

      $rootScope.$on('notification', function(event, type, notification){
        notification.user = $rootScope.currentUser.name;
        notification.timestamp = new Date().getTime();
        notification.type = type;
        notification.userId = $rootScope.currentUser.$id;
        notification.isSeen = false;

        self.pushNotifications(notification);
      });
    };
  });
