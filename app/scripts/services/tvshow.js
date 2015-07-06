/* global services:true */

'use strict';

services.service('TvShow', ['KodiWS', '$q', function(KodiWS, $q) {
  var fields = ['title', 'genre', 'year'];
  var tvshow = {

    /**
     * Get all TV shows from Kodi
     *
     * @return a deferred callback with the TV shows in parameter
     */
    all: function() {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShows', { properties: fields, sort: { method: 'title' }}).then(function(data) {
        deferred.resolve(data.tvshows);
      });
      return deferred.promise;
    },

    /**
     * Get a page of TV shows from Kodi.
     *
     * @param integer showNum : the TV show number (e.g. 26 for the 2nd page if we take 25 per page)
     * @param integer size : the maximum number of shows we want for this page
     * @return a deferred callback with data in parameter
     */
    page: function(showNum, size) {
      var deferred = $q.defer();
      KodiWS.send('VideoLibrary.GetTVShows', { properties: fields, sort: { method: 'title' }, limits: { start: showNum, end: size }}).then(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    /**
     * Find a specific TV show
     *
     * @param integer tvshowId : the ID of the TV show
     * @return a deferred callback with the TV show information
     */
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

    /**
     * Get information on a season.
     *
     * @param integer tvshowId : the ID of the TV show
     * @param integer season : the season number.
     * @return a callback with the season information.
     */
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

    /**
     * Play an episode.
     *
     * @param integer episodeId : the ID of the episode.
     * @return void
     */
    playEpisode: function(episodeId) {
      KodiWS.send('Player.Open', { item: { episodeid: episodeId }});
    }
  };
  return tvshow;
}]);
