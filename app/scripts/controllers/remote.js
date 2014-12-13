/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', '$interval', 'KodiRemote', 'KodiPlayer', function ($scope, $interval, KodiRemote, KodiPlayer) {
    $scope.inputButton = function(action) {
      KodiRemote.input(action);
    };
    $scope.volumeDownButton = function() {
      KodiRemote.volumeDown();
    };
    $scope.volumeUpButton = function() {
      KodiRemote.volumeUp();
    };

    $scope.playerInterval = function() {
      KodiPlayer.active().then(function(player) {
        $scope.player = player;
        if (player != null)
        {
          KodiPlayer.get(player.playerid).then(function(data) {
            $scope.playedItem = data;
          });
        }
      });
    }

    $interval( function() { $scope.playerInterval(); }, 1000);
}]);
