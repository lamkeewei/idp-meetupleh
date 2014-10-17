'use strict';

describe('Directive: ratingsChart', function () {

  // load the directive's module and view
  beforeEach(module('idpMeetuplehApp'));
  beforeEach(module('app/ratingsChart/ratingsChart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ratings-chart></ratings-chart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ratingsChart directive');
  }));
});