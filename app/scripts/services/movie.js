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
        var fields = ['title', 'year', 'playcount'];
        KodiWS.send('VideoLibrary.GetMovies', { properties: fields, sort: { method: 'title' }}).then(function(data) {
          deferred.resolve(data.movies);
        });
        return deferred.promise;
      },

      /**
       * Get a page of movies from Kodi.
       *
       * @param integer movieNum : the movie number (e.g. 26 for the 2nd page if we take 25 per page)
       * @param integer size : the maximum number of movies we want for this page
       * @return a deferred callback with data in parameter
       */
      page: function(movieNum, size) {
        var deferred = $q.defer();
        var fields = ['title', 'year', 'playcount'];
        KodiWS.send('VideoLibrary.GetMovies', { properties: fields, sort: { method: 'title' }, limits: { start: movieNum, end: movieNum + size }}).then(function(data) {
          deferred.resolve(data);
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

      /**
       * Find a movie by its ID
       *
       * @param integer movie : the movie ID
       * @return a deferred callback with movie details.
       */
      find: function(movieId) {
        var deferred = $q.defer();
        var fields = ['title', 'year', 'genre', 'rating', 'director', 'plot', 'runtime', 'thumbnail', 'cast'];
        KodiWS.send('VideoLibrary.GetMovieDetails', { movieid: parseInt(movieId), properties: fields }).then(function(data) {
          var movie = data.moviedetails;
          movie.rating = Math.round(movie.rating * 10) / 10;
          movie.runtime = movie.runtime / 60;
          movie.cast = movie.cast.slice(0, 5);
          deferred.resolve(movie);
        });
        return deferred.promise;
      }
    };
    return movie;
  }
]);
