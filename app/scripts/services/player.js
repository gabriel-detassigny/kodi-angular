/* global services:true */

'use strict';

services.service('KodiPlayer', ['KodiWS', '$q',
  function(KodiWS, $q) {

    function time_format(time) {
      var string = '';
      if (time.hours > 0) {
        string += time.hours + ':';
      }
      if (time.minutes < 10) {
        string += '0';
      }
      string += time.minutes + ':';
      if (time.seconds < 10) {
        string += '0';
      }
      string += time.seconds;
      return string;
    }

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
      get: function(playerId) {
        var deferred = $q.defer();
        KodiWS.send('Player.getItem', { playerid: playerId, properties: ['title', 'artist'] }).then(function(data) {
          var item = {
            label: data.item.label,
            time: null,
            totalTime: null,
            percentage: null,
            paused: false
          };
          if (data.item.type == 'song')
          {
            item.label = data.item.title + ' - ' + data.item.artist[0];
          }
          KodiWS.send('Player.getProperties', { playerid: playerId, properties: ['time', 'totaltime', 'percentage', 'speed'] }).then(function(data) {
            if (data.speed == 0) {
              item.paused = true;
            }
            item.percentage = Math.ceil(data.percentage);
            item.totalTime = time_format(data.totaltime);
            item.time = time_format(data.time);
            deferred.resolve(item);
          });
        });
        return deferred.promise;
      },
      playPause: function(playerId) {
        KodiWS.send('Player.PlayPause', { playerid: playerId });
      },
      stop: function(playerId) {
        KodiWS.send('Player.Stop', { playerid: playerId });
      }
    };

    return hash;
  }
]);
