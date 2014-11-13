'use strict';

angular.module('idpMeetuplehApp')
  .service('FbUser', function ($window, $firebase, $q, Event, $rootScope) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/users');

    this.getUser = function(md5) {
      var sync = $firebase(this.baseRef.child(md5));
      return sync.$asObject();
    };

    this.addUserEvent = function(userId, eventId) {
      var sync = $firebase(this.baseRef.child(userId).child('events').child(eventId));
      sync.$set(true);
    };

    this.getUserEvents = function (userId) {
      var deferred = $q.defer();

      var sync = $firebase(this.baseRef.child(userId).child('events'));
      var ref = sync.$asArray();

      ref
        .$loaded()
        .then(function(events){
          var promises = [];
          events.forEach(function(event){
            var promise = Event.getEvent(event.$id)
              .$loaded().then(function(details){
                event.details = details;
              });

            promises.push(promise);
          });

          $q.all(promises).then(function(data){
            deferred.resolve(events);
          });

          // Watch for ref change and do remerge
          ref.$watch(function(event){
            if (event.key) {
              events.forEach(function(e){
                if (e.$id === event.key) {
                  Event.getEvent(e.$id).$loaded().then(function(d) {
                    e.details = d;
                  });
                }
              });
            }
          });
        });

        return deferred.promise;
    };

    this.getContacts = function(md5) {
      var self = this;
      var deferred = $q.defer();

      var sync = $firebase(this.baseRef.child(md5).child('contacts'));
      sync.$asArray()
        .$loaded()
        .then(function(contacts) {
          var promises = [];
          contacts.forEach(function(contact) {
            promises.push(self.getUser(contact.$id).$loaded());
          });

          $q.all(promises).then(function(data){
            deferred.resolve(data);
          });
        });        

        return deferred.promise;
    };

    this.getEventContacts = function(eventId){
      var promises = [];
      var deferred = $q.defer();

      promises.push(Event.getEventAttendees(eventId).$loaded());
      promises.push(this.getContacts($rootScope.currentUser.$id));

      $q.all(promises)
        .then(function(results){
          var contacts = results[1];
          var invited = results[0];
          var filtered = [];

          contacts.forEach(function(c){
            var match = false;
            invited.forEach(function(i){              
              if (c.$id === i.$id) {
                match = true;
              }
            });

            if (!match) {
              filtered.push(c);              
            }
          });

          deferred.resolve(filtered);
        });

        return deferred.promise;
    };
  });
