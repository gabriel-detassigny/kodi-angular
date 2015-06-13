/* global services:true */

'use strict';

services.service('KodiPlayer', ['KodiWS', '$q',
  function(KodiWS, $q) {

    function timeFormat(time) {
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

    var speeds = [-32, -16, -8, -4, -2, -1, 1, 2, 4, 8, 16, 32];

    var hash = {
      active: function() {
        var deferred = $q.defer();
        KodiWS.send('Player.GetActivePlayers', {}).then(function(data) {
          var result = null;
          for (var i = 0; i < data.length ; i++)
          {
            if (data[i].type !== 'picture')
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
            paused: false,
            speed: 0
          };
          if (data.item.type === 'song')
          {
            item.label = data.item.title + ' - ' + data.item.artist[0];
          }
          KodiWS.send('Player.getProperties', { playerid: playerId, properties: ['time', 'totaltime', 'percentage', 'speed'] }).then(function(data) {
            item.speed = data.speed;
            item.percentage = Math.ceil(data.percentage);
            item.totalTime = timeFormat(data.totaltime);
            item.time = timeFormat(data.time);
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
      },
      changeItem: function(playerId, state) {
        KodiWS.send('Player.GoTo', { playerid: playerId, to: state });
      },
      changeSpeed: function(playerId, speed, forward) {
        if (speed === 0) {
          speed = 1;
        }
        var i = speeds.indexOf(speed);
        if (i > 0 && !forward) {
          KodiWS.send('Player.SetSpeed', { playerid: playerId, speed: speeds[i - 1] });
        }
        else if (i + 1 < speeds.length && forward) {
          KodiWS.send('Player.SetSpeed', { playerid: playerId, speed: speeds[i + 1] });
        }
      }
    };

    return hash;
  }
]);
