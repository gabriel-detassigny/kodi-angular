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

var services = angular.module('kodiServices', []); // jshint ignore:line
var app = angular.module('kodiAngularApp', [
    'ngResource',
    'ngRoute',
    'infinite-scroll',
    'kodiServices',
    'kodiConfig'
  ]);

  app.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
      var path = $location.path().substring(0, route.length);
      return route === path;
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
      .when('/tvshows/:tvshowId', {
        templateUrl: 'views/showtvshow.html',
        controller: 'TvShowViewCtrl'
      })
      .when('/tvshows/:tvshowId/seasons/:season', {
        templateUrl: 'views/showseason.html',
        controller: 'SeasonViewCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .when('/music/:artistId', {
        templateUrl: 'views/showartist.html',
        controller: 'ArtistViewCtrl'
      })
      .when('/music/:artistId/albums/:albumId', {
        templateUrl: 'views/showalbum.html',
        controller: 'AlbumViewCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/remote'
      });
  });
