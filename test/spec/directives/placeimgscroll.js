'use strict';

describe('Directive: placeImgScroll', function () {

  // load the directive's module
  beforeEach(module('idpMeetuplehApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<place-img-scroll></place-img-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the placeImgScroll directive');
  }));
});
