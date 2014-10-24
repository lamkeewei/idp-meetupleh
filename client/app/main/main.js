'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          events: ['FbUser', '$rootScope', function(FbUser, $rootScope) {
            return FbUser.getUserEvents($rootScope.currentUser.$id);
          }]
        }
      });
  });