/* global app:true */

'use strict';

app.controller('RemoteCtrl', function ($scope, $http, KODI_URL) {
    $scope.up = function() {
      $http.post(KODI_URL, { jsonrpc: '2.0', id: 1, method: 'Input.Up'});
    };
    $scope.down = function() {
      $http.post(KODI_URL, { jsonrpc: '2.0', id: 1, method: 'Input.Down'});
    };
    $scope.right = function() {
      $http.post(KODI_URL, { jsonrpc: '2.0', id: 1, method: 'Input.Right'});
    };
    $scope.left = function() {
      $http.post(KODI_URL, { jsonrpc: '2.0', id: 1, method: 'Input.Left'});
    };
  });
