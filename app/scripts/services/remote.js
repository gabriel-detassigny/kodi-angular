/* global app:true */

'use strict';

services.service('KodiRemote', ['KodiWS',
  function(KodiWS) {
    var remote = {
      left: function() {
        KodiWS.send('Input.Left');
      },
      right: function() {
        KodiWS.send('Input.Right');
      },
      down: function() {
        KodiWS.send('Input.Down');
      },
      up: function() {
        KodiWS.send('Input.Up');
      }
    };
    return remote;
  }
]);
