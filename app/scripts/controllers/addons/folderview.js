/* global app:true */

'use strict';

app.controller('FolderViewCtrl', ['$scope', '$routeParams', 'Addon', function($scope, $routeParams, Addon) {
  $scope.waiting = true;
  Addon.find($routeParams.addonId).then(function(data) {
    $scope.addon = data;
    Addon.listItems($routeParams.addonId, $routeParams.folder).then(function(data) {
      $scope.files = data ? data.files : [];
      $scope.waiting = false;
    });
    $scope.play = function(file) {
      Addon.playFile(file);
    };
  });
}]);
