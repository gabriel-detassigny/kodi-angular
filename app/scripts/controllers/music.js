/* global app:true */

'use strict';

app.controller('MusicCtrl', ['$scope', 'Music', function($scope, Music) {
  Music.artists().then(function(data) {
    $scope.artists = data;
  });
}]);
