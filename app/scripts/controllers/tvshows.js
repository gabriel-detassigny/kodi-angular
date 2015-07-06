/* global app:true */

'use strict';

app.controller('TvShowsCtrl', ['$scope', 'TvShow', 'PER_PAGE', function($scope, TvShow, PER_PAGE) {
  var showNum = 0;
  var finished = false;
  var size = PER_PAGE;

  $scope.waiting = false;
  $scope.tvshows = [];

  $scope.nextPage = function() {
    if (finished) {
      return ;
    }
    $scope.waiting = true;
    TvShow.page(showNum, size).then(function(data) {
      for (var i = 0; i < data.tvshows.length; i++) {
        $scope.tvshows.push(data.tvshows[i]);
      }
      showNum += size;
      if (showNum + size > data.limits.total) {
        size = data.limits.total - showNum;
        if (size <= 0) {
          finished = true;
        }
      }
      $scope.waiting = false;
    });

  };
}]);
