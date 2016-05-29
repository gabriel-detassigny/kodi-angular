/* global app:true */

'use strict';

app.controller('MusicCtrl', ['$scope', 'Music', 'PER_PAGE', function($scope, Music, PER_PAGE) {
  var artistNum = 0;
  var finished = false;
  var size = PER_PAGE;

  $scope.waiting = false;
  $scope.artists = [];


  $scope.nextPage = function() {
    if (finished) {
      return ;
    }
    $scope.waiting = true;
    Music.artists(artistNum, size).then(function(data) {
      for (var i = 0; i < data.artists.length; i++) {
        $scope.artists.push(data.artists[i]);
      }
      artistNum += size;
      if (artistNum + size > data.limits.total) {
        size = data.limits.total - artistNum;
        if (size <= 0) {
          finished = true;
        }
      }
      $scope.waiting = false;
    });
  };
}]);
