/* global app:true */

'use strict';

/**
 * @ngdoc overview
 * @name kodiAngularApp
 * @description
 * # kodiAngularApp
 *
 * Main module of the application.
 */

var services = angular.module('kodiServices', []);
services.constant('KODI_URL', '192.168.0.18');

var app = angular.module('kodiAngularApp', [
    'ngResource',
    'ngRoute',
    'kodiServices'
  ]);

  app.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/remote', {
        templateUrl: 'views/remote.html',
        controller: 'RemoteCtrl'
      })
      .when('/tvshows', {
        templateUrl: 'views/tvshows.html',
        controller: 'TvShowsCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .otherwise({
        redirectTo: '/remote'
      });
  });
