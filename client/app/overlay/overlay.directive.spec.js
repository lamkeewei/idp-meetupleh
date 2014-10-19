'use strict';

describe('Directive: overlay', function () {

  // load the directive's module and view
  beforeEach(module('idpMeetuplehApp'));
  beforeEach(module('app/overlay/overlay.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<overlay></overlay>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the overlay directive');
  }));
});