/* global app:true */

'use strict';

app.controller('AlbumViewCtrl', ['$scope', '$routeParams', 'Music', function($scope, $routeParams, Music) {
  Music.findAlbum($routeParams.artistId, $routeParams.albumId).then(function(data) {
    $scope.album = data;
  });
  $scope.play = function(songId, albumId) {
    Music.playSong(albumId, songId);
  };
}]);
