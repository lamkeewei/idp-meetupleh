'use strict';

angular.module('idpMeetuplehApp')
  .service('Event', function ($window, $firebase, $q, User) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/events');

    this.addToEvent = function(userId, eventId){
      var ref = this.baseRef.child(eventId).child('attendees').child(userId);
      $firebase(ref).$set(true);
    };

    this.setBootstrap = function(eventId, step){
      var ref = this.baseRef.child(eventId).child('bootstrap');
      return $firebase(ref).$set(step);
    };

    this.finishBootstrap = function (eventId) {
      var ref = this.baseRef.child(eventId).child('bootstrap');
      return $firebase(ref).$remove();
    };

    this.confirmSlot = function(timings, timing, eventId){
      var self = this;

      timings.forEach(function(t){
        var ref = self.baseRef.child(eventId).child('date').child(t.$id);
        $firebase(ref).$set(false);
      });            
      
      var selectedRef = this.baseRef.child(eventId).child('date').child(timing.$id);
      return $firebase(selectedRef).$set(true);
    };

    this.dropUser = function(eventId, userId){
      var ref = this.baseRef.child(eventId).child('attendees').child(userId);
      User.leaveEvent(userId, eventId);
      return $firebase(ref).$remove();
    };

    this.addEvent = function (title, organizer, contacts, date) {
      var sync = $firebase(this.baseRef);
      var attendees = {};
      contacts.forEach(function(contact){
        if (contact.selected) {
          attendees[contact.$id] = true;          
        }
      });

      attendees[organizer] = true;
      var event = {
        title: title,
        organizer: organizer,    
        date: {},    
        attendees: attendees
      };

      event.date[date.getTime() + '-morning'] = false;
      event.date[date.getTime() + '-afternoon'] = false;
      event.date[date.getTime() + '-evening'] = false;
      return sync.$push(event);
    };

    this.getAllEvents = function(){
      var sync = $firebase(this.baseRef);
      return sync.$asArray();
    };

    this.getEventAttendees = function(eventId){
      var ref = this.baseRef.child(eventId).child('attendees');
      return $firebase(ref).$asArray();      
    };

    this.getEventAttendeesFull = function(eventId){
      var deferred = $q.defer();
      var ref = this.baseRef.child(eventId).child('attendees');
      var sync = $firebase(ref).$asArray();

      sync.$loaded()
        .then(function(attendees){
          var promises = [];

          attendees.forEach(function(a){
            var d = $q.defer();
            User.getUser(a.$id).$loaded()
              .then(function(user){
                a.user = user;
                d.resolve();
              });

            promises.push(d.promise);
          });

          $q.all(promises).then(function(){
            deferred.resolve(attendees);
          });

          sync.$watch(function(event) {
            if (event.key) {
              attendees.forEach(function(attendee){
                if (attendee.$id === event.key) {
                  attendee.user = User.getUser(attendee.$id);
                }
              });
            }
          });
        });

      return deferred.promise;
    };   

    this.getEvent = function(eventId) {
      var sync = $firebase(this.baseRef.child(eventId));
      return sync.$asObject();
    };

    this.unconfirm = function (timing, eventId) {
      var ref = this.baseRef.child(eventId).child('date').child(timing.$id);
      return $firebase(ref).$set(false);
    };

    this.deleteEvent = function(eventId) {
      var ref = this.baseRef.child(eventId);
      return $firebase(ref).$remove();
    };
  });
