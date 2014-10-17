'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('suggestionList', {
        url: '/suggestion/list',
        templateUrl: 'app/suggestionList/suggestionList.html',
        controller: 'SuggestionlistCtrl'
      });
  });