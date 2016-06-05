'use strict';

describe('Kodi remote service', function() {
  var mockKodiWS;

  // Load module
  beforeEach(module('kodiServices'));

  // Mock Kodi Web Socket service
  function mockWebSocket(sendCallback) {
    mockKodiWS = { send: sendCallback };
    spyOn(mockKodiWS, 'send');
    module(function ($provide) {
      $provide.value('KodiWS', mockKodiWS);
    });
  }

  it('should send an input action', function() {
    mockWebSocket(function() {});

    inject(function(KodiRemote) {
      KodiRemote.input('test');
      expect(mockKodiWS.send).toHaveBeenCalledWith('Input.test', {});
    });
  });

  it('should send a system action', function() {
    mockWebSocket(function() {});

    inject(function(KodiRemote) {
      KodiRemote.system('test');
      expect(mockKodiWS.send).toHaveBeenCalledWith('System.test', {});
    });
  });
});
