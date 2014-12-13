/* global services:true */

'use strict';

services.service('KodiRemote', ['KodiWS',
  function(KodiWS) {

    var remote = {
      input: function(action) {
        KodiWS.send('Input.' + action, {});
      },
      volumeDown: function() {
        KodiWS.send('Application.GetProperties', {properties: ['volume']}).then(function(data) {
          if (data.volume > 0)
            {
              KodiWS.send('Application.SetVolume', {volume: (data.volume - 5)});
            }
        });
      },
      volumeUp: function() {
        KodiWS.send('Application.GetProperties', {properties: ['volume']}).then(function(data) {
          if (data.volume < 100)
            {
              KodiWS.send('Application.SetVolume', {volume: (data.volume + 5)});
            }
        });
      }
    };
    return remote;
  }
]);
