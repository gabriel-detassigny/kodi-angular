/* global app:true */

'use strict';

app.controller('SeasonViewCtrl', ['$scope', '$routeParams', 'TvShow', function($scope, $routeParams, TvShow) {
  TvShow.findSeason($routeParams.tvshowId, $routeParams.season).then(function(data) {
    $scope.season = data;
  });
  $scope.play = function(episodeId) {
    TvShow.playEpisode(episodeId);
  };
}]);
