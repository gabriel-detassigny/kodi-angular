/* global app:true */

'use strict';

app.controller('TvShowsCtrl', ['$scope', 'TvShow', function($scope, TvShow) {
  TvShow.all().then(function(data) {
    $scope.tvshows = data;
  });
}]);
