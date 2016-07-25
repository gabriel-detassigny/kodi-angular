/* global app:true */

'use strict';

app.controller('AddonViewCtrl', ['$scope', '$routeParams', 'Addon', function($scope, $routeParams, Addon) {
  $scope.waiting = true;
  Addon.find($routeParams.addonId).then(function(data) {
    $scope.addon = data;
    $scope.waiting = false;
  });
  $scope.execute = function() {
    Addon.executeAddon($scope.addon.addonid);
  };
}]);
