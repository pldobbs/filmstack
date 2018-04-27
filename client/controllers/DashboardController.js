app.controller('DashboardController', ['$scope', '$http', 'DashboardFactory', 'ListFactory', 'UserService', '$routeParams','UserFactory', 'DeleteMovieFactory', 'SearchFactory', 'SearchCacheService', '$location', function ($scope, $http, DashboardFactory, ListFactory, UserService, $routeParams, UserFactory, DeleteMovieFactory, SearchFactory, SearchCacheService, $location) {
	//remove below to test for protected routes
	// UserService.requireLogin();

		UserService.me().then(function(user){
			$scope.user = user;

			if($scope.user) {
				$scope.loggedIn = true;
			} else {
				$scope.loggedIn = false;
			}

			$scope.windowLoaded = false;
			var dashInfo = new DashboardFactory({id: $scope.user.id});
			dashInfo.$get(function(data) {
				$scope.otherLists = data.otherLists;
				$scope.mainList = data.mainList;
				$scope.currentListID = $scope.otherLists[0].id;
				// console.log($scope.mainList);
			}).then(function() {
				console.log('window has loaded');
				$scope.windowLoaded = true;
			});
		});
	
	$scope.search = function () {
		$scope.results = {};

		var movies = new SearchFactory({ query: $scope.query });

		movies.$save(function (data) {
			$scope.results = data.results;
			SearchCacheService.setResults(data.results);
			$location.path('/search-results');
		});
	};


	$scope.changeView = function(listID) {
		var newList = new DashboardFactory({id: $scope.user.id, listid: listID});
		newList.$save(function(data) {
			$scope.mainList = data.lists;
		}, function(err) {
			console.log(err);
		});
		$scope.currentListID = listID;
	};

	$scope.createList = function(listname) {
		var createdList = new DashboardFactory(
			{
				name: listname,
				userid: $scope.user.id
			}
		);

		createdList.$save(function(success) {
			console.log(success);
		}, function(err) {
			console.log('can\'t create a new list', err);
		});

		location.reload();
	};

	$scope.logOut = function(){
           UserFactory.get({id: 'logout'}, function() {
                // window.location.replace('http://localhost:3000');
                window.location.replace('/');
           });
		};

	$scope.deleteMovie = function(movieID) {
		var removeMovie = new DeleteMovieFactory(
			{
				movieID: movieID,
				listID: $scope.currentListID
			}
		);

		removeMovie.$save(function(success) {
			console.log(success);
		}, function(errr) {
			console.log(err);
		}).then(function() {
			location.reload();
		});
	};

	$(function() {
		$(window).on('resize', function() {
			var staticHeight = 50 + 75 + 150;
			$('#wrapper .container-fluid').css({
				'min-height': $('#wrapper').height() - staticHeight
			});
		});

		$(window).trigger('resize');
	});
}]);