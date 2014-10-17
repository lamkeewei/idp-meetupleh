'use strict';

describe('Controller: PlaceCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var PlaceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaceCtrl = $controller('PlaceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
