'use strict';

angular.module('idpMeetuplehApp')
  .directive('overlay', function () {
    return {
      templateUrl: 'app/overlay/overlay.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });