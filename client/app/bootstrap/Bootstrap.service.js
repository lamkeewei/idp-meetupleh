'use strict';

angular.module('idpMeetuplehApp')
  .service('Bootstrap', function ($q, $firebase, $window, User, Event, $rootScope) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/bootstrap');

    this.intialize = function(eventId){
      var ref = this.baseRef.child(eventId);

      Event.getEventAttendees(eventId).$loaded()
        .then(function(attendees){
          attendees.forEach(function(a){
            if ($rootScope.currentUser.$id !== a.$id) {              
              var fb = $firebase(ref.child(a.$id));
              fb.$set(0);
            }
          });
        });
    };

    this.drop = function(bootstrap, eventId) {
      this.finish(eventId);

      bootstrap.forEach(function(b){
        if (b.$value === 3) {
          console.log(b.$id);
          Event.dropUser(eventId, b.$id);
        }
      });
    };

    this.finish = function (eventId) {
      Event.finishBootstrap(eventId);
      var ref = this.baseRef.child(eventId);
      return $firebase(ref).$remove();
    };

    this.getBootstrap = function (eventId) {
      var ref = this.baseRef.child(eventId);
      var deferred = $q.defer();
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
  });
