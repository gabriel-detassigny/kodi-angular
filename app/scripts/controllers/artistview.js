/* global app:true */

'use strict';

app.controller('ArtistViewCtrl', ['$scope', '$routeParams', 'Music', function($scope, $routeParams, Music) {
  Music.findArtist($routeParams.artistId).then(function(data) {
    $scope.artist = data;
  });
  $scope.play = function(albumId) {
    Music.playSong(albumId, null);
  };
}]);
