/* global services:true */

'use strict';

services.service('KodiPlayer', ['KodiWS', '$q',
  function(KodiWS, $q) {

    var hash = {
      active: function() {
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
      },
      get: function(player) {
        var deferred = $q.defer();
        KodiWS.send('Player.getItem', { playerid: player.playerid, properties: ['title', 'artist', 'duration', 'streamdetails'] }).then(function(data) {
          var item = {
            label: data.item.label,
            time: null,
            totalTime: null,
            percentage: null
          };
          if (data.item.type == 'song')
            {
              item.label = data.item.title + ' - ' + data.item.artist[0];
            }
          KodiWS.send('Player.getProperties', { playerid: player.playerid, properties: ['time', 'totaltime', 'percentage'] }).then(function(data) {
            item.percentage = Math.ceil(data.percentage);
            item.totalTime = data.totaltime.minutes + ':' + data.totaltime.seconds;
            item.time = data.time.minutes + ':' + data.time.seconds;
            deferred.resolve(item);
          });
        });
        return deferred.promise;
      }
    };

    return hash;
  }
]);
