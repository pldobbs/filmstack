app.factory('SearchFactory', ['$resource', '$http', function($resource, $http) {
	return $resource('/api/search/:query',{query: '@query'});
}]);

// old code using hard-coded paths

// app.factory('SearchFactory', ['$resource', '$http', function($resource, $http) {
// 	return $resource('http://localhost:3000/api/search/:query',{query: '@query'});
// }]);