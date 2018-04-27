var app = angular.module('filmstack', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashController'
    })
    .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailController'
    })
    .when('/search-results', {
        templateUrl: 'views/search-results.html',
        controller: 'SearchController'
    })
    .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController'
    });
}]);