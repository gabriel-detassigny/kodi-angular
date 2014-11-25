/* global services:true */

'use strict';

services.service('TvShow', ['KodiWS', '$q', function(KodiWS, $q) {
  var tvshow = {
    all: function() {
      var deferred = $q.defer();
      var fields = ['title', 'plot', 'genre', 'year'];
      KodiWS.send('VideoLibrary.GetTVShows', { properties: fields }).then(function(data) {
        deferred.resolve(data.tvshows);
      });
      return deferred.promise;
    }
  };
  return tvshow;
}]);
