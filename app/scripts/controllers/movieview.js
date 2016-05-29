/* global app:true */

'use strict';

app.controller('MovieViewCtrl', ['$scope', '$routeParams', 'Movie', function($scope, $routeParams, Movie) {
  Movie.find($routeParams.movieId).then(function(data) {
    $scope.movie = data;
  });
}]);
