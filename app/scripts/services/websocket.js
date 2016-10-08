/* global services:true */

'use strict';

services.service('KodiWS', ['$q', '$window', 'KODI_URL', 'KODI_PORT', 'KODI_HTTP_PORT', 'SOCKET_TIMEOUT', 'DEBUG', function($q, $window, KODI_URL, KODI_PORT, KODI_HTTP_PORT, SOCKET_TIMEOUT, DEBUG) {
  var ws = new WebSocket('ws://' + KODI_URL + ':' + KODI_PORT + '/jsonrpc');

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
   * @param integer attempt : the attempt number (decreasing until 0).
   * @return void
   */
  function waitForConnection(callback, attempt) {
    setTimeout(function() {
      if (ws.readyState !== WebSocket.OPEN) {
        if (attempt > 0) {
          debugLog('Wait for connection...');
          waitForConnection(callback, attempt - 1);
        } else {
          debugLog('Error : Could not connect to Kodi!');
          $window.location.href = '#error';
        }
      } else {
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
      var id = Math.floor((Math.random() * 100) + 1);
      ws.send(JSON.stringify({jsonrpc: '2.0', id: id, method: method, params: params}));
      ws.onmessage = function(message) {
        var response = JSON.parse(message.data);

        if (response.id === id) {
          if (response.error !== undefined) {
            var error = response.error;
            debugLog(method + ' : ' + error.message);
          }

          deferred.resolve(response.result);
        }
      };
    }, 10);
    return deferred.promise;
  }

  /**
   *
   * @param thumbUrl {string} - encoded url for thumbnail (as it usually return Kodi), for example: <code>image://http%3a%2f%2fcdn-radiotime-logos.tunein.com%2fs100934q.png/</code>
   * @return url {string} - proper thumbnail url, for example: <code>http://192.168.2.124:8080/image/http%3a%2f%2fcdn-radiotime-logos.tunein.com%2fs100934q.png</code>
   */
  function getThumbnailURL(thumbUrl) {
    if (!thumbUrl)
      return thumbUrl;
    thumbUrl = thumbUrl.replace('image://', '');
    if (thumbUrl.charAt(thumbUrl.length - 1) === '/') {
      thumbUrl = thumbUrl.substring(0, thumbUrl.length - 1);
    }
    if (thumbUrl.charAt(0) === '/') {
      thumbUrl = thumbUrl.substring(1);
    }
    var tmpThumbUrl = decodeURIComponent(thumbUrl);
    if (tmpThumbUrl.indexOf('http://') === 0 || tmpThumbUrl.indexOf('https://') === 0)
      return tmpThumbUrl;
    return 'http://' + KODI_URL + ':' + KODI_HTTP_PORT + '/image/' + thumbUrl;
  }

  var service = {
    send: sendMessage,
    getThumbnailURL: getThumbnailURL
  };
  return service;
}]);
