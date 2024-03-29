'use strict';

angular.module('idpMeetuplehApp')
  .service('User', function ($window, $rootScope, $q, $firebase) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com');

    this.getUser = function (userId) {
      var ref = this.baseRef.child('users').child(userId);
      return $firebase(ref).$asObject();      
    };

    this.leaveEvent = function(userId, eventId){
      var ref = this.baseRef.child('users').child(userId).child('events').child(eventId);
      return $firebase(ref).$remove();
    };

    this.login = function (userId) {
      var deferred = $q.defer();

      var ref = this.baseRef.child('users').child(userId);
      $firebase(ref).$asObject().$loaded()
        .then(function(user){
          $rootScope.currentUser = user;
          deferred.resolve(user);
        });

      return deferred.promise;
    };

    this.logout = function(){
      delete $rootScope.currentUser;
    };
  });
