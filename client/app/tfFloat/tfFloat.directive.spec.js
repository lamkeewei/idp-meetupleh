'use strict';

describe('Directive: tfFloat', function () {

  // load the directive's module
  beforeEach(module('idpMeetuplehApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tf-float></tf-float>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tfFloat directive');
  }));
});