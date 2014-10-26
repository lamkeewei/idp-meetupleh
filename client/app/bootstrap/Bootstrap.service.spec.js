'use strict';

describe('Service: Bootstrap', function () {

  // load the service's module
  beforeEach(module('idpMeetuplehApp'));

  // instantiate service
  var Bootstrap;
  beforeEach(inject(function (_Bootstrap_) {
    Bootstrap = _Bootstrap_;
  }));

  it('should do something', function () {
    expect(!!Bootstrap).toBe(true);
  });

});
