'use strict';

app.controller('RemoteCtrl', function ($scope, $http, KODI_URL) {
    $scope.up = function() {

    }
    $scope.down = function() {

    }
    $scope.right = function() {

    }
    $scope.left = function() {
      $http.post(KODI_URL + "Input.Left", { request: { jsonrpc: "2.0", id: 1, method: "Input.Left"}});
    }
  });
