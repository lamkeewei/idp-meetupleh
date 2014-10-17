'use strict';

angular.module('idpMeetuplehApp')
  .directive('ratingsChart', function () {
    return {
      templateUrl: 'app/ratingsChart/ratingsChart.html',
      replace: true,
      restrict: 'EA',
      scope: {
      },
      link: function (scope, element, attrs) {
        scope.ratings = [20, 30, 50, 70, 100];

        var oneStar = document.getElementById('one-star');
        oneStar.style.width = scope.ratings[0] + '%';

        var twoStars = document.getElementById('two-stars');
        twoStars.style.width = scope.ratings[1] + '%';

        var threeStars = document.getElementById('three-stars');
        threeStars.style.width = scope.ratings[2] + '%';

        var fourStars = document.getElementById('four-stars');
        fourStars.style.width = scope.ratings[3] + '%';

        var fiveStars = document.getElementById('five-stars');
        fiveStars.style.width = scope.ratings[4] + '%';
      }
    };
  });