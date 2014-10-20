'use strict';

angular.module('idpMeetuplehApp')
  .service('Event', function ($window, $firebase, $q) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/events');

    this.addEvent = function (title, organizer, contacts, date) {
      var sync = $firebase(this.baseRef);
      var attendees = {};
      contacts.forEach(function(contact){
        if (contact.selected) {
          attendees[contact.$id] = true;          
        }
      });

      attendees[organizer] = true;

      return sync.$push({
        title: title,
        organizer: organizer,
        date: date.getTime(),
        attendees: attendees
      });
    };

    this.getAllEvents = function(){
      var sync = $firebase(this.baseRef);
      return sync.$asArray();
    };

    this.getEvent = function(eventId) {
      var sync = $firebase(this.baseRef.child(eventId));
      return sync.$asObject();
    };
  });
