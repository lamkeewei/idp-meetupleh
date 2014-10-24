'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newEvent', {
        url: '/event/new',
        templateUrl: 'app/newEvent/newEvent.html',
        controller: 'NeweventCtrl',
        resolve: {
          contacts: ['FbUser', '$rootScope', function(FbUser, $rootScope){
            return FbUser.getContacts($rootScope.currentUser.$id);
          }]
        }        
      });
  });