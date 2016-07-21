/* global app:true */

'use strict';

app.controller('AddonViewCtrl', ['$scope', '$routeParams', 'Addon', function($scope, $routeParams, Addon) {
  Addon.find($routeParams.addonId).then(function(data) {
    $scope.addon = data;
  });
}]);
