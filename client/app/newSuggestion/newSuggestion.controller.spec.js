'use strict';

describe('Controller: NewsuggestionCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var NewsuggestionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsuggestionCtrl = $controller('NewsuggestionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
