/* global app:true */

'use strict';

app.controller('MoviesCtrl', ['$scope', 'Movie', function($scope, Movie) {
  Movie.all().then(function(data) {
    $scope.movies = data;
  });
}]);
