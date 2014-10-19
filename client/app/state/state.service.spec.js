'use strict';

describe('Service: State', function () {

  // load the service's module
  beforeEach(module('idpMeetuplehApp'));

  // instantiate service
  var state;
  beforeEach(inject(function (_State_) {
    State = _State_;
  }));

  it('should do something', function () {
    expect(!!State).toBe(true);
  });

});
