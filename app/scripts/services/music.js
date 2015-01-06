/* global services:true */

'use strict';

services.service('Music', ['KodiWS', '$q', function(KodiWS, $q) {
  var music = {
    artists: function() {
      var deferred = $q.defer();
      KodiWS.send('AudioLibrary.GetArtists', { properties: ['genre'] }).then(function(data) {
        deferred.resolve(data.artists);
      });
      return deferred.promise;
    },
  };
  return music;
}]);
