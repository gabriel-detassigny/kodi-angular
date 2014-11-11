/* global services:true */

'use strict';

services.service('Movie', ['KodiWS', '$q',
  function(KodiWS, $q) {
    var movie = {
      all: function() {
        var deferred = $q.defer();
        KodiWS.send('VideoLibrary.GetMovies').then(function(data) {
          deferred.resolve(data.movies);
        });
        return deferred.promise;
      },
    };
    return movie;
  }
]);
