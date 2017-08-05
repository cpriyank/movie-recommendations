(function () {
    angular
        .module('Rave')
        .controller('registerController', registerController);

    function registerController($location, currentUser, userService) {

        var model = this;

        model.register = register;
        model.currentUser = currentUser;
        function register(username, password, password2, role, firstName, lastName) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "Passwords must match";
                return;
            }

            if(firstName === null || firstName === '' || typeof firstName === 'undefined') {
                model.error = "First name is required";
                return;
            }

            if(role === null || role === '' || typeof role === 'undefined') {
                model.error = "Role is required";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry! Username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            role: role,
                            firstName: firstName,
                            lastName: lastName
                        };
                        // console.log(newUser);
                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    // console.log(user);
                    $location.url('/profile/'+username);
                });
        }
    }
})();
