(function(){
      angular
        .module('Rave')
        .factory('messageService', messageService);

    function messageService($http) {

        var api = {
            messageReceived: messageReceived,
            messageSent: messageSent
        };

        return api;

        function messageReceived(userId, message) {
            var url = "/api/project/messageReceived/" + userId;
            return $http.put(url, message);
        }

        function messageSent(userId, message) {
            var url = "/api/project/messageSent/" + userId;
            return $http.put(url, message);
        }

    }

})();


