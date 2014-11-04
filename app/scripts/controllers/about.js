'use strict';

/**
 * @ngdoc function
 * @name kodiAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the kodiAngularApp
 */
angular.module('kodiAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
