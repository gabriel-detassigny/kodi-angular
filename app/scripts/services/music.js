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
    findArtist: function(artistId) {
      var deferred = $q.defer();
      KodiWS.send('AudioLibrary.GetAlbums', { filter: { artistid: parseInt(artistId) }, properties: ['artist', 'year']}).then(function(data) {
        var artist = { artistid: artistId };
        artist.label = data.albums[0].artist[0];
        artist.albums = data.albums;
        console.log(artist);
        deferred.resolve(artist);
      });
      return deferred.promise;
    },
  };
  return music;
}]);
