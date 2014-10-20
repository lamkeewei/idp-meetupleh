'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          events: ['FbUser', 'userMD5', function(FbUser, md5) {
            return FbUser.getUserEvents(md5);
          }]
        }
      });
  });