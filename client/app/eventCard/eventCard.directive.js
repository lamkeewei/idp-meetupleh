'use strict';

angular.module('idpMeetuplehApp')
  .directive('eventCard', function () {
    return {
      templateUrl: 'app/eventCard/eventCard.html',
      restrict: 'EA',
      scope: {
        details: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });