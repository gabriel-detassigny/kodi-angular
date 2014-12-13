/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', 'KodiRemote', 'KodiPlayer', function ($scope, KodiRemote, KodiPlayer) {
    $scope.inputButton = function(action) {
      KodiRemote.input(action);
    };
    $scope.volumeDownButton = function() {
      KodiRemote.volumeDown();
    };
    $scope.volumeUpButton = function() {
      KodiRemote.volumeUp();
    };
    KodiPlayer.active().then(function(player) {
      $scope.player = player;
      if (player != null)
        {
          KodiPlayer.get(player).then(function(data) {
            $scope.playedItem = data;
          });
        }
    });
}]);
