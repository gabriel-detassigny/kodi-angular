/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', 'KodiRemote', function ($scope, KodiRemote) {
    $scope.upButton = function() {
      KodiRemote.up();
    };
    $scope.downButton = function() {
      KodiRemote.down();
    };
    $scope.rightButton = function() {
      KodiRemote.right();
    };
    $scope.leftButton = function() {
      KodiRemote.left();
    };
  }]);
