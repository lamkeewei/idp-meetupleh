'use strict';

describe('Service: Call', function () {

  // load the service's module
  beforeEach(module('idpMeetuplehApp'));

  // instantiate service
  var Call;
  beforeEach(inject(function (_Call_) {
    Call = _Call_;
  }));

  it('should do something', function () {
    expect(!!Call).toBe(true);
  });

});
