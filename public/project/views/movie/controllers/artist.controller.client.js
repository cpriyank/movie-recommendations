(function () {
    angular
        .module('Rave')
        .controller('artistController', artistController);

    function artistController(movieService, currentUser, $routeParams) {
        var model = this;
        model.artistId = $routeParams.artistId;
        model.findArtistById = findArtistById;
        model.currentUser = currentUser;
        function init() {
            findArtistById(model.artistId);
        }
        init();

        function findArtistById(artistId) {
            movieService
                .findArtistById(artistId)
                .then(function (response) {
                    model.actor = response.data;
                });
        }
    }
})();
