app.service('UserService', ['$http', '$location', function($http, $location) {
    var user;
    // checks to see if user is already logged in.
    this.isLoggedIn = function(){
        if(user){
            return true;
        }
        return false;
    };

    //redirect a user from a page if they are not logged in 
    //Set query string of /login equal to the page they were on. 
    this.requireLogin = function(){
        if(!this.isLoggedIn()){
            var current = $location.path();
            $location.path('/splash').search('p', current);
        }
    };

    /*
    Log a user in by making a POST request to our login handler on the back-end
    send in the email/password combo entered on the client side
    */
    this.login = function(username,password){
        return $http({
            method: 'POST',
            // url: 'http://localhost:3000/api/users/login',
            url: '/api/users/login',
            data: {username: username, password: password}
        }).then(function(success){
            user = success.data;
            return user;
        });
    };

    /*
    Log out our existing user by making a GET request to the logout handler on the back-end
    This destroys the sessionin the MySQL database an removes the user's cookie*/
    this.logout = function(){
        return $http({
            method: 'GET',
            // url: 'http://localhost:3000/api/user/logout'
            url: '/api/user/logout'
        }).then(function(){
            user = undefined;
        });
    };

    this.me = function() {
        if(user) {
            return Promise.resolve(user);
        }
        return $http({
            // url: "http://localhost:3000/api/users/me"
            url: "/api/users/me"
        }).then(function(success) {
            user = success.data;
            return user;
        });
    };
}]);