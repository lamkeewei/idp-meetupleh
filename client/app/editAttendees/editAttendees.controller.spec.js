'use strict';

describe('Controller: EditattendeesCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var EditattendeesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditattendeesCtrl = $controller('EditattendeesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
