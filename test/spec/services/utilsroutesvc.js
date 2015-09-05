'use strict';

describe('Service: utilsRouteSvc', function () {

  // load the service's module
  beforeEach(module('climbingMemo'));

  // instantiate service
  var utilsRouteSvc;
  beforeEach(inject(function (_utilsRouteSvc_) {
    utilsRouteSvc = _utilsRouteSvc_;
  }));

  it('should do something', function () {
    expect(!!utilsRouteSvc).toBe(true);
  });

});
