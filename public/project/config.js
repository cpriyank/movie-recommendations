(function () {
    angular
        .module('Rave')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/movie/templates/index.view.client.html',
                controller: 'indexController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/review', {
                templateUrl: 'views/admin/templates/admin-reviews.view.client.html',
                controller: 'adminReviewsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkGuestOnly
                }
            })
            .when('/logout', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'logoutController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkGuestOnly
                }
            })
            .when('/profile/edit', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/:username', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/message', {
                templateUrl: 'views/user/templates/message.view.client.html',
                controller: 'messageController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/feed', {
                templateUrl: 'views/user/templates/feed.view.client.html',
                controller: 'feedController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search/:query', {
                templateUrl: 'views/movie/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/movie/:movieId",{
                templateUrl: "views/movie/templates/movie.view.client.html",
                controller: "movieController",
                controllerAs: "model",
                resolve :{
                    currentUser: checkCurrentUser
                }
            })
            .when("/genre/:genreId",{
                templateUrl: "views/movie/templates/genre.view.client.html",
                controller: "genreController",
                controllerAs: "model",
                resolve :{
                    currentUser : checkCurrentUser
                }
            })
            .when("/artist/:artistId",{
                templateUrl: "views/movie/templates/artist.view.client.html",
                controller: "artistController",
                controllerAs: "model",
                resolve :{
                    currentUser : checkCurrentUser
                }
            });
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkGuestOnly(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                    $location.url('/profile/'+user.username);
                }
            });

        return deferred.promise;
    }
})();
