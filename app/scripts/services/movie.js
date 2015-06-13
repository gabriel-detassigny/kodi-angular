/* global services:true */

'use strict';

services.service('Movie', ['KodiWS', '$q',
  function(KodiWS, $q) {
    var movie = {

      /**
       * Get all movies from Kodi, ordered by title
       *
       * @return deferred callback returning movies
       */
      all: function() {
        var deferred = $q.defer();
        var fields = ['title', 'genre', 'year'];
        KodiWS.send('VideoLibrary.GetMovies', { properties: fields, sort: { method: 'title' }}).then(function(data) {
          deferred.resolve(data.movies);
        });
        return deferred.promise;
      },

      /**
       * Play a movie
       *
       * @param integer movie : the movie ID
       * @return void
       */
      play: function(movie) {
        KodiWS.send('Player.Open', { item: { movieid: movie }});
      },
    };
    return movie;
  }
]);
