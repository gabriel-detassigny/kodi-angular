/* global app:true */

'use strict';

app.controller('TvShowViewCtrl', ['$scope', '$routeParams', 'TvShow', function($scope, $routeParams, TvShow) {
  TvShow.find($routeParams.tvshowId).then(function(data) {
    $scope.tvshow = data;
  });
}]);
