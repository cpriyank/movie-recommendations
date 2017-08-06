(function () {
    angular
        .module('Rave')
        .controller('logoutController', logoutController);

    function logoutController($location,
                               $route,
                               $routeParams,
                               currentUser,
                               userService,
                               messageService,
                               mediaService) {

        var model = this;
        model.currentUser = currentUser;

        function init() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        init();
    }
})();
