/* global services:true */

'use strict';

services.service('KodiWS', ['$q', '$window', 'KODI_URL', 'SOCKET_TIMEOUT', 'DEBUG', function($q, $window, KODI_URL, SOCKET_TIMEOUT, DEBUG) {
  var ws = new WebSocket('ws://' + KODI_URL + ':9090/jsonrpc');

  /**
   * Display console logs if DEBUG is set in config.js
   *
   * @param string message : the message to display.
   * @return void
   */
  function debugLog(message) {
    if (DEBUG) {
      console.log(message);
    }
  }

  ws.onopen = function() {
    debugLog('Connected to Kodi Web Socket');
  };

  ws.onerror = function() {
    debugLog('Socket error');
  };

  ws.onclose = function() {
    debugLog('Closing socket');
  };

  /**
   * Attempt to connect to the Web Socket (try several times if needed by recursion).
   *
   * @param The callback to call if connection succeed.
   * @param integer attempt : the attempt tumber (decreasing until 0).
   * @return void
   */
  function waitForConnection(callback, attempt) {
    setTimeout(function() {
      if (ws.readyState !== WebSocket.OPEN)
        {
          if (attempt > 0)
          {
            debugLog('Wait for connection...');
            waitForConnection(callback, attempt - 1);
          }
          else
          {
            debugLog('Error : Could not connect to Kodi!');
            $window.location.href = '#error';
          }
        }
      else
        {
          callback();
        }
    }, SOCKET_TIMEOUT);
  }

  /**
   * Communicate through the Web Socket.
   *
   * @param string method : the method sent through the socket.
   * @param array params : parameters sent.
   * @return callback with the response.
   */
  function sendMessage(method, params) {
    var deferred = $q.defer();
    waitForConnection(function() {
      ws.send(JSON.stringify({jsonrpc: '2.0', id: 1, method: method, params: params}));
      ws.onmessage = function(message) {
        var response = JSON.parse(message.data);
        if (response.error !== undefined) {
          var error = response.error;
          debugLog(error.data.method + ' : ' + error.message);
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
