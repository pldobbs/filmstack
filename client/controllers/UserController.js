app.controller("UserController", ["$scope", "UserFactory", "$location", "UserService", "SEOService",
    function ($scope, UserFactory, $location, UserService, SEOService) {
        UserService.requireLogin();

            $scope.deleteUser = function () {
                new User().$delete({ id: id });
            };

            $scope.editEmail = function (id) {
                var newEmail = prompt("Enter a new email address for user with id of " + id);
                if (newEmail) {
                    var user = User.get({ id: id });
                    user.email = newEmail;
                    User.update({ id: id }, user);
                }
            };

            $scope.editPassword = function (id) {
                var newPass = prompt("Enter a new password for user with id of " + id);
                if (newPass) {
                    var user = User.get({ id: id });
                    user.password = newPass;
                    User.update({ id: id }, user);
                }
            };

            $scope.logOut = function(){
           UserFactory.get({id: 'logout'}, function() {
                // window.location.replace('http://localhost:3000');
                window.location.replace('/');
           });
        };

        SEOService.setSEO({
            title: 'movies with SEO',
            image: './assets/logos/covalence-logo.png',
            url: $location.url(),
            description: 'pick your next movie with filmstack'
        });
    }]);