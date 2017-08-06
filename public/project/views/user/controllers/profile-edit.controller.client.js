(function () {
    angular
        .module('Rave')
        .controller('profileEditController', profileEditController);

    function profileEditController($location,
                               $routeParams,
                               currentUser,
                               userService) {

        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;
        model.currentUser = currentUser;
        function init() {
            renderUser(currentUser);
        }
        init();

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister.";
                });
        }

        function updateUser(user) {

            if(user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined') {
                model.message = false;
                model.error = "First name required";
                return;
            }

            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.error = false;
                    model.message = "User update successful";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

    }
})();
