'use strict';

/**
 * @ngdoc function
 * @name kodiAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kodiAngularApp
 */
angular.module('kodiAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
