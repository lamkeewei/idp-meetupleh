'use strict';

angular.module('idpMeetuplehApp')
  .controller('NeweventCtrl', function ($scope, $location) {
    $scope.back = function(){
      $location.path('/');
    };
    
    $scope.search = {};
    $scope.contacts = [
      {
        name: {
          firstName: 'Sean',
          lastName: 'Tan'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Nicholas',
          lastName: 'Tan'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Andre',
          lastName: 'Ng'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Ci Qing',
          lastName: 'Ng'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Tao',
          lastName: 'Liang'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'James',
          lastName: 'Potter'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Harry',
          lastName: 'Potter'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Ronald',
          lastName: 'Weasley'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Draco',
          lastName: 'Malfoy'
        },
        contactNumber: '96937965'
      },
      {
        name: {
          firstName: 'Lily',
          lastName: 'Potter'
        },
        contactNumber: '96937965'
      }
    ];

    $scope.completeAddEvent = function() {
      $location.path('/event');
    };

    $scope.getFirstCharacter = function(contact) {
      return contact.name.firstName.substring(0,1);
    };
  });
