/* global app:true */

'use strict';

services.service('KodiWS', function() {
  var ws = new WebSocket('ws://localhost:9090/jsonrpc');
  ws.onopen = function() {
    console.log('Connected to Kodi Web Socket');
  }
  var service = {
    send: function (method) {
      if (ws.readyState != WebSocket.OPEN)
        console.log('Cannot send message to Kodi');
      else
        ws.send(JSON.stringify({jsonrpc: '2.0', id: 1, method: method}));
    }
  };
  return service;
});
