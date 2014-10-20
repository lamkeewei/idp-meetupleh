'use strict';

angular.module('idpMeetuplehApp')
  .directive('eventCard', function ($location, State) {
    return {
      templateUrl: 'app/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        details: '='
      },
      link: function (scope, element, attrs) {
        scope.viewEvent = function(){
          State.eventState.active = scope.details.$id;
          $location.path('/event/id/' + scope.details.$id);
        };
      }
    };
  });