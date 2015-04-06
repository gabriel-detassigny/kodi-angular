/* global services:true */

'use strict';

services.service('KodiWS', ['$q', '$window', 'KODI_URL', 'SOCKET_TIMEOUT', function($q, $window, KODI_URL, SOCKET_TIMEOUT) {
  var ws = new WebSocket('ws://' + KODI_URL + ':9090/jsonrpc');

  ws.onopen = function() {
    console.log('Connected to Kodi Web Socket');
  };

  function waitForConnection(callback, attempt) {
    setTimeout(function() {
      if (ws.readyState !== WebSocket.OPEN)
        {
          if (attempt > 0)
          {
            console.log('Wait for connection...');
            waitForConnection(callback, attempt - 1);
          }
          else
          {
            console.log('Error : Could not connect to Kodi!');
            $window.location.href = "#error";
          }
        }
      else
        {
          callback();
        }
    }, SOCKET_TIMEOUT);
  }

  function sendMessage(method, params) {
    var deferred = $q.defer();
    waitForConnection(function() {
      ws.send(JSON.stringify({jsonrpc: '2.0', id: 1, method: method, params: params}));
      ws.onmessage = function(message) {
        var response = JSON.parse(message.data);
        if (response['error'] !== undefined) {
          var error = response['error'];
          console.log(error['data']['method'] + ' : ' + error['message']);
        }

        deferred.resolve(response.result);
      };
    }, 10);
    return deferred.promise;
  }

  var service = {
    send: sendMessage,
  };
  return service;
}]);
