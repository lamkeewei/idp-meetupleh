'use strict';

/**
 * @ngdoc directive
 * @name idpMeetuplehApp.directive:placeImgScroll
 * @description
 * # placeImgScroll
 */
angular.module('idpMeetuplehApp')
  .directive('placeImgScroll', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the placeImgScroll directive');
      }
    };
  });
