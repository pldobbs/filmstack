app.factory('DeleteMovieFactory', ['$resource', function($resource) {
	return $resource('/api/deleteMovie/');
}]);

// old code using hard-coded paths

// app.factory('DeleteMovieFactory', ['$resource', function($resource) {
// 	return $resource('http://localhost:3000/api/deleteMovie/');
// }]);