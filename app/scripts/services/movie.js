/* global services:true */

'use strict';

services.service('Movie', ['KodiWS', '$q',
  function(KodiWS, $q) {
    var movie = {
      all: function() {
        var deferred = $q.defer();
        var fields = ['originaltitle', 'thumbnail', 'tagline', 'genre', 'year'];
        KodiWS.send('VideoLibrary.GetMovies', {properties: fields}).then(function(data) {
          deferred.resolve(data.movies);
        });
        return deferred.promise;
      },
    };
    return movie;
  }
]);
