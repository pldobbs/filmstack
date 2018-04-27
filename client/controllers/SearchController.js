app.controller('SearchController', ['$scope', '$http', '$location', 'SearchFactory', 'SearchCacheService', 'UserService', function ($scope, $http, $location, SearchFactory, SearchCacheService, UserService) {
	

	$scope.results = SearchCacheService.getResults();



	if (UserService.isLoggedIn() === true) {
		$scope.loggedIn = true;
	} else {
		$scope.loggedIn = false;
	}

	$scope.goToMovie = function(id) {
		var path = '/detail/' + id;
		$location.path(path);
	};
	$scope.search = function () {
		
		$scope.results = {};

		var movies = new SearchFactory({ query: $scope.query });

		movies.$save(function (data) {
			$scope.results = data.results;
			SearchCacheService.setResults(data.results);
			$location.path('/search-results');
		});
	};

}]);