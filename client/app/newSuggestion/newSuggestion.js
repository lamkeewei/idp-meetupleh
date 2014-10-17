'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newSuggestion', {
        url: '/suggestion/new',
        templateUrl: 'app/newSuggestion/newSuggestion.html',
        controller: 'NewsuggestionCtrl'
      })
      .state('searchResults', {
        url: '/suggestion/new/:flag',
        templateUrl: 'app/newSuggestion/newSuggestion.html',
        controller: 'NewsuggestionCtrl'
      });
  });