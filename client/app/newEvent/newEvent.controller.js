'use strict';

angular.module('idpMeetuplehApp')
  .controller('NeweventCtrl', function ($scope, $location, State, contacts, Event, userMD5, FbUser) {    
    $scope.back = function(){
      State.back();
    };
    
    $scope.search = {};
    $scope.contacts = contacts;

    $scope.completeAddEvent = function() {
      Event.addEvent('Test Event', userMD5, $scope.contacts, new Date())
        .then(function(ref){
          var name = ref.name();
          State.eventState.active = name;

          contacts.forEach(function(contact){
            if (contact.selected) {
              FbUser.addUserEvent(contact.$id, name);
            }
          });

          FbUser.addUserEvent(userMD5, name);

          $location.path('/event/id/' + name);
        });
    };

    $scope.getFirstCharacter = function(contact) {
      return contact.name.firstName.substring(0,1);
    };
  });
