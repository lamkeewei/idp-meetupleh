'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newEvent', {
        url: '/event/new',
        templateUrl: 'app/newEvent/newEvent.html',
        controller: 'NeweventCtrl',
        resolve: {
          contacts: ['FbUser', 'userMD5', function(FbUser, md5){
            return FbUser.getContacts(md5);
          }]
        }        
      });
  });