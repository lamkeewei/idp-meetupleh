'use strict';

angular.module('idpMeetuplehApp')
  .controller('NeweventCtrl', function ($scope, $location, State, contacts, Event, userMD5, FbUser, $timeout, $window) {    
    $scope.back = function(){
      State.back();
    };
    
    $scope.flags = {
      hide: true,
      menuTitle: 'Choose Participants'
    };

    $scope.event = {
    };
    $scope.search = {};
    $scope.contacts = contacts;

    $scope.completeAddEvent = function() {
      if (!$scope.event.title) {
        var menuBar = document.getElementById('new-event-toolbar');
        angular.element(menuBar).addClass('show-title');
        $scope.flags.menuTitle = 'Cancel';

        $timeout(function(){
          $scope.flags.hide = false;          
        }, 450);

        $timeout(function(){
          angular.element(document.querySelector('#title-input input')).focus();
        }, 500);

        return;
      }

      if (!$scope.event.date) {
        angular.element(document.querySelector('#date-input input')).focus();
        $scope.dateFocus();
        return;
      }

      Event.addEvent($scope.event.title, userMD5, $scope.contacts, $scope.event.dateValue.toDate())
        .then(function(ref){
          var name = ref.name();
          State.eventState.active = name;

          contacts.forEach(function(contact){
            if (contact.selected) {
              FbUser.addUserEvent(contact.$id, name);
            }
          });

          FbUser.addUserEvent(userMD5, name);

          $location.path('/event/id/' + name);
        });
    };

    $scope.getFirstCharacter = function(contact) {
      return contact.name.firstName.substring(0,1);
    };

    $scope.dateFocus = function() {
      if ($scope.event.date && $scope.event.date.length > 0) {
        return;
      }

      var input = document.querySelector('#date-input input');
      var top = input.getBoundingClientRect().top + 20 + 'px';

      var autocomplete = angular.element(document.getElementById('date-autocomplete'));
      autocomplete.css('visibility', 'visible');
      autocomplete.css('opacity', 1);
      autocomplete.css('top', top);
      autocomplete.css('background-color', '')

    };

    $scope.dateBlur = function(){
      var autocomplete = angular.element(document.getElementById('date-autocomplete'));
      autocomplete.css('visibility', 'hidden');
      autocomplete.css('opacity', 0);
    };

    $scope.flags.popupCount = 0;
    $scope.$watch('event.date', function(newValue, oldValue){
      if ($scope.flags.popupCount < 1) {
        $scope.flags.popupCount++;
        return;
      }

      if ($scope.event.date) {
        $scope.dateBlur(); 
      } else {        
        $scope.dateFocus(); 
      }
    }, true);

    $scope.selectQuickDate = function(date){
      $scope.event.date = date;

      if (date === 'Tomorrow') {
        $scope.event.dateValue = $window.moment().hour(0).minute(0).seconds(0).milliseconds(0).add(1, 'days');
      } else if (date === 'Next week') {
        $scope.event.dateValue = $window.moment().hour(0).minute(0).seconds(0).milliseconds(0).add(7, 'days');
      } else if (date === 'Next month') {
        $scope.event.dateValue = $window.moment().hour(0).minute(0).seconds(0).milliseconds(0).add(30, 'days');
      }
    };
  });
