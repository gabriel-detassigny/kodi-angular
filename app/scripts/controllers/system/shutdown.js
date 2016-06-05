/* global app:true */

'use strict';

app.controller('ShutdownCtrl', ['$scope', 'KodiRemote', function ($scope, KodiRemote) {
  $scope.system = function(action) {
    KodiRemote.system(action);
  };
}]);
