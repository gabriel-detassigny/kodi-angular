/* global app:true */

'use strict';

app.controller('ErrorCtrl', ['$scope', 'KODI_URL', function($scope, KODI_URL) {
  $scope.kodi_url = KODI_URL;
}]);
