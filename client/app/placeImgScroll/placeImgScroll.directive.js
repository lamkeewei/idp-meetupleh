'use strict';

angular.module('idpMeetuplehApp')
  .directive('placeImgScroll', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var mainContent = document.querySelector('#place-content .content-wrapper');
        mainContent.style.minHeight = ($window.innerHeight - 64) + 'px';

        element.bind('scroll', function(){
          var container = element.children('.content-wrapper');
          var top = container.position().top * -1;
          var coverImage = document.getElementById('cover-image');
          var toolbar = document.getElementById('cover-toolbar');

          if (top <= 134) {
            $window.requestAnimationFrame(function(){              
              var opacity = 1 - (top / 134);
              coverImage.style.opacity = opacity;
              coverImage.style.top = (-0.3 * top) + 'px';
              toolbar.style.cssText = 'background-color: rgba(63,81,181,' + (1 - opacity) + ') !important';
            });
          } else {
            $window.requestAnimationFrame(function(){              
              coverImage.style.opacity = 0;
              toolbar.style.cssText = 'background-color: rgba(63,81,181,1) !important';
            });
          }
        });
      }
    };
  });