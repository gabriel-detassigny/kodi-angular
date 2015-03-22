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
        deferred.resolve(artist);
      });
      return deferred.promise;
    },
    findAlbum: function(artistId, albumId) {
      var deferred = $q.defer();
      var result = { artistId: artistId, albumId: albumId };
      KodiWS.send('AudioLibrary.GetAlbumDetails', { albumid: parseInt(albumId), properties: ['title', 'artist'] }).then(function(data) {
        result.album = data.albumdetails.title;
        result.artist = data.albumdetails.artist[0];
        KodiWS.send('AudioLibrary.GetSongs', { properties: ['title', 'track', 'duration'], sort: { method: 'track' }, filter: { albumid: parseInt(albumId) }}).then(function(data) {
          result.songs = data.songs;
          console.log(result);
          deferred.resolve(result);
        });
      });
      return deferred.promise;
    },
  };
  return music;
}]);
