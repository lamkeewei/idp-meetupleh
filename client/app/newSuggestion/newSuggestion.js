'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newSuggestion', {
        url: '/suggestion/new/:activity',
        templateUrl: 'app/newSuggestion/newSuggestion.html',
        controller: 'NewsuggestionCtrl'
      });
  });