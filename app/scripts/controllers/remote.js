/* global app:true */

'use strict';

app.controller('RemoteCtrl', ['$scope', 'KodiRemote', function ($scope, KodiRemote) {
    $scope.inputButton = function(action) {
      KodiRemote.input(action);
    };
  }]);
