'use strict';

describe('Controller: EventtimeCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var EventtimeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventtimeCtrl = $controller('EventtimeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
