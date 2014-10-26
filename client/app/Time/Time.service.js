'use strict';

angular.module('idpMeetuplehApp')
  .service('Time', function ($firebase, $window, $q, $rootScope) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/');

    this.getEventTimes = function(eventId){
      var ref = this.baseRef.child('events').child(eventId).child('date');
      return $firebase(ref).$asArray();
    };

    this.addTimeslot = function(eventId, timing){
      var date = $window.moment(timing.day).toDate().getTime();
      var timeslot = date + '-' + timing.time.toLowerCase();
      var ref = this.baseRef.child('events').child(eventId).child('date').child(timeslot);

      $rootScope.$emit('notification', 'new-timeslot', {
        eventId: eventId,
        timing: timing
      });

      return $firebase(ref).$set(false);
    };

    this.setAvailability = function (eventId, timeslot, userId, available) {
      var ref = this.baseRef.child('availabilities').child(eventId).child(timeslot).child(userId);
      return $firebase(ref).$set(available);
    };

    this.getUserAvailabilities = function(eventId){
      var ref = this.baseRef.child('availabilities').child(eventId);
      return $firebase(ref).$asObject();
    };

    this.getUserAvailabilitiesArr = function(eventId){
      var ref = this.baseRef.child('availabilities').child(eventId);
      return $firebase(ref).$asArray();
    };

    this.removeUserAvailability = function(eventId, timeslot, userId){
      var ref = this.baseRef.child('availabilities').child(eventId).child(timeslot).child(userId);
      return $firebase(ref).$remove();
    };
  });
