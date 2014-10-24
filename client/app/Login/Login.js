'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Login', {
        url: '/login',
        templateUrl: 'app/Login/Login.html',
        controller: 'LoginCtrl'
      });
  });