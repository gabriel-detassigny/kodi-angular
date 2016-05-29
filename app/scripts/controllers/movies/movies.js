/* global app:true */

'use strict';

app.controller('MoviesCtrl', ['$scope', 'Movie', 'PER_PAGE', function($scope, Movie, PER_PAGE) {
  var movieNum = 0;
  var finished = false;
  var size = PER_PAGE;

  $scope.waiting = false;
  $scope.movies = [];

  $scope.nextPage = function() {
    if (finished) {
      return ;
    }
    $scope.waiting = true;
    Movie.page(movieNum, size).then(function(data) {
      for (var i = 0; i < data.movies.length; i++) {
        $scope.movies.push(data.movies[i]);
      }
      movieNum += size;
      if (movieNum + size > data.limits.total) {
        size = data.limits.total - movieNum;
        if (size <= 0) {
          finished = true;
        }
      }
      $scope.waiting = false;
    });

  };

  $scope.play = function(movie) {
    Movie.play(movie);
  };
}]);
