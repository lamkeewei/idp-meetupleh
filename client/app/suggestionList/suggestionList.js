'use strict';

angular.module('idpMeetuplehApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('suggestionList', {
        url: '/suggestion/list/:activity',
        templateUrl: 'app/suggestionList/suggestionList.html',
        controller: 'SuggestionlistCtrl',
        resolve: {
          suggestions: ['Suggestion', '$stateParams', 'State', function(Suggestion, $stateParams, State){
            return Suggestion.getSuggestions(State.eventState.active, $stateParams.activity);
          }]
        }
      });
  });