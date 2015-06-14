/* global services:true */

'use strict';

services.service('KodiRemote', ['KodiWS',
  function(KodiWS) {

    var remote = {

      /**
       * Send a basic input action to Kodi (Up, Down, Back, etc)
       *
       * @param string action : the name of the action.
       * @return void
       */
      input: function(action) {
        KodiWS.send('Input.' + action, {});
      },

      /**
       * Set the volume down.
       *
       * @return void
       */
      volumeDown: function() {
        KodiWS.send('Application.GetProperties', {properties: ['volume']}).then(function(data) {
          if (data.volume > 0)
            {
              KodiWS.send('Application.SetVolume', {volume: (data.volume - 5)});
            }
        });
      },

      /**
       * Set the volume up.
       *
       * @return void
       */
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
