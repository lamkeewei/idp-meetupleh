'use strict';

angular.module('idpMeetuplehApp')
  .directive('eventCard', function ($location) {
    return {
      templateUrl: 'app/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        details: '='
      },
      link: function (scope, element, attrs) {
        scope.viewEvent = function(){
          $location.path('/event');
        };
      }
    };
  });