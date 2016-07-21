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
    'encodeKodiFolder',
    'kodiThumbnailUrl',
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
      .when('/system/shutdown', {
        templateUrl: 'views/system/shutdown.html',
        controller: 'ShutdownCtrl'
      })
      .when('/tvshows', {
        templateUrl: 'views/tvshows/tvshows.html',
        controller: 'TvShowsCtrl'
      })
      .when('/tvshows/:tvshowId', {
        templateUrl: 'views/tvshows/showtvshow.html',
        controller: 'TvShowViewCtrl'
      })
      .when('/tvshows/:tvshowId/seasons/:season', {
        templateUrl: 'views/tvshows/showseason.html',
        controller: 'SeasonViewCtrl'
      })
      .when('/movies', {
        templateUrl: 'views/movies/movies.html',
        controller: 'MoviesCtrl'
      })
      .when('/movies/:movieId', {
        templateUrl: 'views/movies/showmovie.html',
        controller: 'MovieViewCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music/music.html',
        controller: 'MusicCtrl'
      })
      .when('/music/:artistId', {
        templateUrl: 'views/music/showartist.html',
        controller: 'ArtistViewCtrl'
      })
      .when('/music/:artistId/albums/:albumId', {
        templateUrl: 'views/music/showalbum.html',
        controller: 'AlbumViewCtrl'
      })
      .when('/addon/:addonId/folder/:folder', {
        templateUrl: 'views/addons/showfolder.html',
        controller: 'FolderViewCtrl'
      })
      .when('/addon/:addonId/folder', {
        templateUrl: 'views/addons/showfolder.html',
        controller: 'FolderViewCtrl'
      })
      .when('/addon/:addonId', {
        templateUrl: 'views/addons/showaddon.html',
        controller: 'AddonViewCtrl'
      })
      .when('/addons/:content', {
        templateUrl: 'views/addons/addons.html',
        controller: 'AddonsCtrl'
      })
      .when('/addons', {
        templateUrl: 'views/addons/addons.html',
        controller: 'AddonsCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/remote'
      });
  });
