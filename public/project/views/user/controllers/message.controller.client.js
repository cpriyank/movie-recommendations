(function () {
    angular
        .module('Rave')
        .controller('messageController', messageController);

    function messageController($location,
                               $route,
                               $routeParams,
                               currentUser,
                               userService,
                               messageService,
                               mediaService) {
        var model = this;

        model.findMessageSent = findMessageSent;
        model.findMessageReceived = findMessageReceived;
        model.currentUser = currentUser;
        function init() {
            findMessageSent();
            findMessageReceived();
        }

        init();

        function findMessageSent() {
            model.messageSent = currentUser.messageSent;
        }

        function findMessageReceived() {
            model.messageReceived = currentUser.messageReceived;
        }
    }
})();
