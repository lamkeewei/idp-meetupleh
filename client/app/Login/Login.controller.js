'use strict';

angular.module('idpMeetuplehApp')
  .controller('LoginCtrl', function ($scope, User, $window, $location, $rootScope) {
    $scope.user = {};

    $scope.login = function(){
      if (!$scope.user.email) {
        return;
      }

      var md5 = $window.md5($scope.user.email);
      User.login(md5).then(function(user){
        if (user.$value !== null) {
          $location.path('/');
        }
      });
    };
  });
