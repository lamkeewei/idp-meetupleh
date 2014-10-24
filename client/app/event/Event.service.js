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
      var event = {
        title: title,
        organizer: organizer,    
        date: {},    
        attendees: attendees
      };

      event.date[date.getTime() + '-morning'] = date.getTime();
      event.date[date.getTime() + '-afternoon'] = date.getTime();
      event.date[date.getTime() + '-evening'] = date.getTime();
      return sync.$push(event);
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
