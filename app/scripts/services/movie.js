/* global services:true */

'use strict';

services.service('Movie', ['KodiWS', '$q',
  function(KodiWS, $q) {
    var movie = {
      all: function() {
        var deferred = $q.defer();
        var fields = ['title', 'genre', 'year'];
        KodiWS.send('VideoLibrary.GetMovies', { properties: fields, sort: { method: 'title' }}).then(function(data) {
          deferred.resolve(data.movies);
        });
        return deferred.promise;
      },
      play: function(movie) {
        KodiWS.send('Player.Open', { item: { movieid: movie }});
      },
    };
    return movie;
  }
]);
