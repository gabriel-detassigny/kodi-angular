/* global services:true */

'use strict';

services.service('KodiRemote', ['KodiWS', '$q',
  function(KodiWS, $q) {

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
      },
      activePlayer: function() {
        var deferred = $q.defer();
        KodiWS.send('Player.GetActivePlayers', {}).then(function(data) {
          var result = null;
          for (var i = 0; i < data.length ; i++)
            {
              if (data[i].type != 'picture')
                {
                  result = data[i];
                }
            }
          deferred.resolve(result);
        });
        return deferred.promise;
      }
    };
    return remote;
  }
]);
