/* global services:true */

'use strict';

services.service('KodiPlayer', ['KodiWS', '$q',
  function(KodiWS, $q) {

    var player = {
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
      }
    };

    return player;
  }
]);
