'use strict';

angular.module('idpMeetuplehApp')
  .service('User', function ($window, $rootScope, $q, $firebase) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com');

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
