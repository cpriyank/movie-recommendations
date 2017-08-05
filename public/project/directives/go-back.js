(function () {
    angular
        .module("goBack", [])
        .directive('goBack', ['$window', function($window) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    elem.bind('click', function () {
                        $window.history.back();
                    });
                }
            };
        }]);
})();