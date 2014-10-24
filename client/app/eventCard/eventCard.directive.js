'use strict';

angular.module('idpMeetuplehApp')
  .directive('eventCard', function ($location, $filter, State) {
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

        scope.getDate = function(){
          var date = 0;
          Object.keys(scope.details.date).forEach(function(d, i){
            date = scope.details.date[d];
          });

          return date;
        };
      }
    };
  });