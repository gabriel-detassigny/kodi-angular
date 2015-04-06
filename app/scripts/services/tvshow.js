/* global services:true */

'use strict';

services.service('TvShow', ['KodiWS', '$q', function(KodiWS, $q) {
  var fields = ['title', 'genre', 'year'];
  var tvshow = {
    all: function() {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShows', { properties: fields, sort: { method: 'title' }}).then(function(data) {
        deferred.resolve(data.tvshows);
      });
      return deferred.promise;
    },
    find: function(tvshowId) {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShowDetails', { properties: fields, tvshowid: parseInt(tvshowId) }).then(function(data) {
        tvshow = data.tvshowdetails;
        KodiWS.send('VideoLibrary.GetSeasons', { properties: ['season', 'episode', 'watchedepisodes'], tvshowid: parseInt(tvshowId) }).then(function(data) {
          tvshow.seasons = data.seasons;
          deferred.resolve(tvshow);
        });
      });
      return deferred.promise;
    },
    findSeason: function(tvshowId, season) {
      var deferred = $q.defer();
      var result = { tvshowId: tvshowId, season: season };
      KodiWS.send('VideoLibrary.GetTVShowDetails', { properties: ['title'], tvshowid: parseInt(tvshowId) }).then(function(data) {
        result.tvshow = data.tvshowdetails.title;
        KodiWS.send('VideoLibrary.GetEpisodes', { properties: ['episode', 'rating', 'playcount', 'firstaired'], tvshowid: parseInt(tvshowId), season: parseInt(season) }).then(function(data) {
          result.episodes = data.episodes;
          deferred.resolve(result);
        });
      });
      return deferred.promise;
    },
    playEpisode: function(episodeId) {
      KodiWS.send('Player.Open', { item: { episodeid: episodeId }});
    }
  };
  return tvshow;
}]);
