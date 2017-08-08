(function () {
    angular
        .module('Rave')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService, currentUser) {
        var model = this;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.renderError = renderError;
        model.currentUser = currentUser;
        function init() {
            findAllUsers();
        }
        init();

        function createUser(user) {

            if (user.role !== "Viewer" && user.role !== "Critic" && user.role !== "Admin") {
                model.message = false;
                model.error = "Wrong user type!";
                return;
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined') {
                model.message = false;
                model.error = "First name is required!";
                return;
            }

            userService
                .findUserByUsername(user.username)
                .then(
                    function () {
                        model.message = false;
                        model.message = "Username already taken!";
                    },
                    function () {
                        userService
                            .createUser(user)
                            .then(function(res) {
                                if(res.name === "ValidationError") {
                                    model.message = false;
                                    model.error = "Sorry! Some values are unacceptable. Please try again.";
                                } else {
                                    model.error = false;
                                    model.message = "User Created";
                                    model.user={};
                                    findAllUsers();
                                }
                            }, renderError);
                    });

        }

        function selectUser(user) {
            model.error = false;
            model.message = "User Selected";
            model.user = angular.copy(user);
        }

        function updateUser(user) {

            if (user.role !== "Viewer" && user.role !== "Critic" && user.role !== "Admin") {
                model.message = false;
                model.error = "Wrong user type!";
                return;
            }

            if (user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined') {
                model.message = false;
                model.error = "First name is required!";
                return;
            }

            userService
                .updateUser(user._id, user)
                .then(function(res){
                    model.error = false;
                    model.message = "User updated. Note that username cannot be changed.";
                    model.user={};
                    findAllUsers();
                }, renderError);
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers)
                .then(function () {
                    model.error = false;
                    model.message = "User Deleted";
                });
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        function renderError(error) {
            model.error = "Sorry! Please check values and try again!";
            model.message = false;
        }
    }
})();
