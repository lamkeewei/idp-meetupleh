'use strict';

describe('Controller: SuggestionlistCtrl', function () {

  // load the controller's module
  beforeEach(module('idpMeetuplehApp'));

  var SuggestionlistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuggestionlistCtrl = $controller('SuggestionlistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
