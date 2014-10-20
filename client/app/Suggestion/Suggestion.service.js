'use strict';

angular.module('idpMeetuplehApp')
  .service('Suggestion', function ($window, $firebase, $q, Place, Vote, userMD5) {
    this.baseRef = new $window.Firebase('https://idp-meetupleh.firebaseio.com/suggestions');

    this.addSuggestion = function(eventId, activity, placeId){
      var ref = this.baseRef.child(eventId).child(activity).child(placeId);
      var sync = $firebase(ref);
      return sync.$set(true);
    };

    this.getSuggestions = function(eventId, activity) {
      var ref = $firebase(this.baseRef.child(eventId).child(activity));
      var sync = ref.$asArray();

      var deferred = $q.defer();

      sync
        .$loaded()
        .then(function(places){
          var promises = [];          
          places.forEach(function(place){
            var promise = Place.get({ id: place.$id }).$promise.then(function(details){
              place.details = details;              
            }).then(function(){
              place.votes = Vote.getVotes(eventId, activity, place.$id);
            }).then(function(){
              place.userVote = Vote.getUserVote(eventId, activity, place.$id, userMD5);
            });

            promises.push(promise);
          });

          $q.all(promises).then(function(){
            deferred.resolve(places);
          });

          sync.$watch(function(event){            
            if (event.key) {
              places.forEach(function(place){
                if (place.$id === event.key) {
                  place.details = Place.get({ id: place.$id });
                  place.votes = Vote.getVotes(eventId, activity, place.$id);
                  place.userVote = Vote.getUserVote(eventId, activity, place.$id, userMD5);
                }
              });
            }
          });
        });

      return deferred.promise;
    };
  });
