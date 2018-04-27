app.factory('ListFactory', ['$resource', function($resource) {
	return $resource('/api/lists/:id', {id: '@id'},
		{
			"update": {method: "PUT"}
		});
}]);

// old code using hard-coded paths

// app.factory('ListFactory', ['$resource', function($resource) {
// 	return $resource('http://localhost:3000/api/lists/:id', {id: '@id'},
// 		{
// 			"update": {method: "PUT"}
// 		});
// }]);