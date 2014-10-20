'use strict';

angular.module('idpMeetuplehApp')
  .service('Vote', function ($window, $firebase, $q) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/votes');

    this.getVotes = function(eventId, activity, placeId){
      var ref = this.baseRef.child(eventId).child(activity).child(placeId);
      return $firebase(ref).$asArray();
    };

    this.addVote = function(eventId, activity, placeId, user, vote) {
      var ref = this.baseRef.child(eventId).child(activity).child(placeId).child(user);
      var sync = $firebase(ref);
      return sync.$set(vote);
    };

    this.getUserVote = function(eventId, activity, placeId, user) {
      var ref = this.baseRef.child(eventId).child(activity).child(placeId).child(user);
      return $firebase(ref).$asObject();
    };

    this.removeVote = function(eventId, activity, placeId, user){
      var ref = this.baseRef.child(eventId).child(activity).child(placeId).child(user);
      $firebase(ref).$remove();
    };
  });
