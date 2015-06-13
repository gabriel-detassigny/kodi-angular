/* global services:true */

'use strict';

services.service('Music', ['KodiWS', '$q', function(KodiWS, $q) {
  var music = {
    artists: function(artistNum, size) {
      var deferred = $q.defer();
      KodiWS.send('AudioLibrary.GetArtists', { properties: ['genre'], sort: { method: 'artist' }, limits: { start: artistNum, end: artistNum + size }}).then(function(data) {
        deferred.resolve(data);
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
          for (var i = 0; i < result.songs.length; i++)
          {
            result.songs[i].minutes = Math.floor(result.songs[i].duration / 60);
            result.songs[i].seconds = Math.floor(result.songs[i].duration % 60);
          }
          deferred.resolve(result);
        });
      });
      return deferred.promise;
    },
    playSong: function(albumId, songId) {
      KodiWS.send('Playlist.Clear', { playlistid: 1 }).then(function() {
        KodiWS.send('Playlist.Add', { playlistid: 1, item: { albumid: parseInt(albumId) }}).then(function() {

          // If there is a songId, seek it and play it. Otherwise, play the whole album.
          if (songId !== null) {
            KodiWS.send('Playlist.GetItems', { playlistid: 1, properties: ['track'] }).then(function(data) {
              var items = data.items;
                for (var pos = 0; pos < items.length ; pos++) {
                  if (items[pos].id == songId) {
                    KodiWS.send('Player.Open', { item: { playlistid: 1, position: pos }});
                  }
                }
            });
          }
          else {
            KodiWS.send('Player.Open', { item: { playlistid: 1 }});
          }
        });
      });
    },
  };
  return music;
}]);
