/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', 'KodiRemote', function ($scope, KodiRemote) {
    $scope.inputButton = function(action) {
      KodiRemote.input(action);
    };
    $scope.volumeDownButton = function() {
      KodiRemote.volumeDown();
    };
    $scope.volumeUpButton = function() {
      KodiRemote.volumeUp();
    };
    KodiRemote.activePlayer().then(function(player) {
      $scope.player = player;
    });
  }]);
