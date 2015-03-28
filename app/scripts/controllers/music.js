/* global app:true */

'use strict';

app.controller('MusicCtrl', ['$scope', 'Music', function($scope, Music) {
  var last = 25;
  var finished = false;

  $scope.waiting = false;
  $scope.artists = [];


  $scope.nextPage = function() {
    if (finished) {
      return ;
    }
    $scope.waiting = true;
    Music.artists(last).then(function(data) {
      for (var i = 0; i < data.artists.length; i++) {
        $scope.artists.push(data.artists[i]);
      }
      $scope.waiting = false;
      last += 25;
      if (last >= data.limits.total) {
        finished = true;
      }
    });
  };
}]);
