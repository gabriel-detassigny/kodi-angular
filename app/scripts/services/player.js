/* global services:true */

'use strict';

services.service('KodiPlayer', ['KodiWS', '$q',
  function(KodiWS, $q) {

    /**
     * Format time into a string
     *
     * @param array time : Array with hours, minutes and seconds.
     * @return string Time formatted as '00:00:00'
     */
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

      /**
       * Get active players from Kodi (if a video or music is being played)
       *
       * @return deferred callback with an active player or a null object.
       */
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

      /**
       * Get the song being played.
       *
       * @param integer playerId : the ID of the active player.
       * @return a deferred callback with the song information.
       */
      get: function(playerId) {
        var deferred = $q.defer();
        KodiWS.send('Player.getItem', { playerid: playerId, properties: ['title', 'artist', 'artistid', 'albumid'] }).then(function(data) {
          if (data === null || data === undefined || data.item === undefined) {
            deferred.resolve(null);
          }
          var item = {
            label: data.item.label,
            time: null,
            totalTime: null,
            percentage: null,
            paused: false,
            speed: 0,
          };
          if (data.item.type === 'song') {
            item.label = data.item.title + ' - ' + data.item.artist[0];
            item.artistid = data.item.artistid[0];
            item.albumid = data.item.albumid;
          }
          KodiWS.send('Player.getProperties', { playerid: playerId, properties: ['time', 'totaltime', 'percentage', 'speed'] }).then(function(data) {
            if (data === undefined) {
              deferred.resolve(null);
            }
            item.speed = data.speed;
            item.percentage = Math.ceil(data.percentage);
            item.totalTime = timeFormat(data.totaltime);
            item.time = timeFormat(data.time);
            deferred.resolve(item);
          });
        });
        return deferred.promise;
      },

      /**
       * Play or Pause a player.
       *
       * @param integer playerId : the ID of the player to pause
       * @return void
       */
      playPause: function(playerId) {
        KodiWS.send('Player.PlayPause', { playerid: playerId });
      },

      /**
       * Stop a player.
       *
       * @param integer playerId : the ID of the player to stop
       * @return void
       */
      stop: function(playerId) {
        KodiWS.send('Player.Stop', { playerid: playerId });
      },

      /**
       * Go to previous or next song.
       *
       * @param integer playerId : the ID of the player
       * @param string state : 'previous' or 'next'
       * @return void
       */
      changeItem: function(playerId, state) {
        KodiWS.send('Player.GoTo', { playerid: playerId, to: state });
      },

      /**
       * Go backward or forward with a specified speed
       *
       * @param integer playerId : the ID of the player
       * @param integer speed : the current speed
       * @param boolean forward
       * @return void
       */
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
