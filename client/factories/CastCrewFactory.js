app.factory('CastCrewFactory', ['$resource', function($resource) {
	return $resource('/api/cast-crew/:id', {id: '@id'});
}]);

// old code using hard-coded paths

// app.factory('CastCrewFactory', ['$resource', function($resource) {
// 	return $resource('http://localhost:3000/api/cast-crew/:id', {id: '@id'});
// }]);