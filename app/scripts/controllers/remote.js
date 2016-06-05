/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', '$interval', '$window', 'KodiRemote', 'KodiPlayer', function ($scope, $interval, $window, KodiRemote, KodiPlayer) {
    $scope.inputButton = function(action) {
      KodiRemote.input(action);
    };
    $scope.volumeDownButton = function() {
      KodiRemote.volumeDown();
    };
    $scope.volumeUpButton = function() {
      KodiRemote.volumeUp();
    };

    $scope.goToShutdown = function() {
      $window.location.href = '#system/shutdown';
    };

    $scope.playerInterval = function() {
      KodiPlayer.active().then(function(player) {
        $scope.player = player;
        if (player !== null) {
          KodiPlayer.get(player.playerid).then(function(data) {
            if (data !== null) {
              $scope.playedItem = data;
            }
          });
        }
      });
    };

    $scope.playPauseButton = function(playerId) {
      KodiPlayer.playPause(playerId);
    };

    $scope.stopButton = function(playerId) {
      KodiPlayer.stop(playerId);
    };

    $scope.previousButton = function(playerId) {
      KodiPlayer.changeItem(playerId, 'previous');
    };

    $scope.nextButton = function(playerId) {
      KodiPlayer.changeItem(playerId, 'next');
    };

    $scope.backwardButton = function(playerId, speed) {
      KodiPlayer.changeSpeed(playerId, speed, false);
    };

    $scope.forwardButton = function(playerId, speed) {
      KodiPlayer.changeSpeed(playerId, speed, true);
    };

    var interval = $interval(function() {
      $scope.playerInterval();
    }, 1000);

    $scope.$on('$locationChangeStart', function() {
      $interval.cancel(interval);
    });

}]);
