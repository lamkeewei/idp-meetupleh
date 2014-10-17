'use strict';

describe('Directive: eventCard', function () {

  // load the directive's module and view
  beforeEach(module('idpMeetuplehApp'));
  beforeEach(module('app/eventCard/eventCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event-card></event-card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the eventCard directive');
  }));
});