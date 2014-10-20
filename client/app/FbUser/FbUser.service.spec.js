'use strict';

describe('Service: FbUser', function () {

  // load the service's module
  beforeEach(module('idpMeetuplehApp'));

  // instantiate service
  var FbUser;
  beforeEach(inject(function (_FbUser_) {
    FbUser = _FbUser_;
  }));

  it('should do something', function () {
    expect(!!FbUser).toBe(true);
  });

});
