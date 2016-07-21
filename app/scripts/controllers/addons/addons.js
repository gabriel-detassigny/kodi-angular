/* global app:true */

'use strict';

app.controller('AddonsCtrl', ['$scope', 'Addon', 'PER_PAGE', '$routeParams', function($scope, Addon, PER_PAGE, $routeParams) {
  var showNum = 0;
  var finished = false;
  var size = PER_PAGE;

  $scope.waiting = false;
  $scope.addons = [];

  $scope.nextPage = function() {
    if (finished) {
      return ;
    }
    $scope.waiting = true;
    Addon.page($routeParams.content, showNum, size).then(function(data) {
      data.addons = data.addons || [];
      for (var i = 0; i < data.addons.length; i++) {
        $scope.addons.push(data.addons[i]);
      }
      showNum += size;
      if (showNum + size > data.limits.total) {
        size = data.limits.total - showNum;
        if (size <= 0) {
          finished = true;
        }
      }
      $scope.waiting = false;
    });

  };
}]);
