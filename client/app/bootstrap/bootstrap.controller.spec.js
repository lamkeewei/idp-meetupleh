'use strict';

describe('Controller: BootstrapCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var BootstrapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BootstrapCtrl = $controller('BootstrapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
