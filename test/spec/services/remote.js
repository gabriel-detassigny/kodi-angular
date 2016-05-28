'use strict';

describe('Kodi remote service', function() {
  var mockKodiWS, KodiRemote;

  beforeEach(function() {
    var services = module('kodiServices');
  });

  beforeEach(function () {
      mockKodiWS = {
          send: function (action, options) {
          }
      };
      spyOn(mockKodiWS, 'send');
      module(function ($provide) {
          $provide.value('KodiWS', mockKodiWS);
      });
  });

  it('should send an input action', inject(function(KodiRemote) {
    KodiRemote.input('test');
    expect(mockKodiWS.send).toHaveBeenCalledWith('Input.test', {});
  }));
});
