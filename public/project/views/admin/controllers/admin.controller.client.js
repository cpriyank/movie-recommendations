(function () {
    angular
        .module('Rave')
        .controller('adminController', adminController);

    function adminController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();