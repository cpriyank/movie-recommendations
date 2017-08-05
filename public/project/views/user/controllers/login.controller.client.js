(function () {
    angular
        .module('Rave')
        .controller('loginController', loginController);

    function loginController($location, userService, currentUser) {

        var model = this;

        model.login = login;
        model.currentUser = currentUser;

        function login(username, password) {
            userService
                .login(username, password)
                .then(login, handleError);

            function login (found) {
                if(found !== null) {
                    $location.url('/profile/'+username);
                } else {
                    model.message = "Please correct Username and Password.";
                }
            }

            function handleError (error) {
                model.message = "Please correct Username and Password.";
            }
        }
    }
})();
