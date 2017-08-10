(function () {
    angular
        .module('Rave')
        .controller('genreController', genreController);

    function genreController(movieService, $routeParams) {
        var model = this;
        model.genreId = $routeParams.genreId;
        model.renderMoviesByGenreId = renderMoviesByGenreId;
        model.findGenreById = findGenreById;

        function init() {
            findGenreById(model.genreId);
            movieService
                .findMoviesByGenreId(model.genreId)
                .then(renderMoviesByGenreId);
        }
        init();

        function renderMoviesByGenreId(response) {
            model.movies = response.data.results;
        }

        function findGenreById(genreId) {
            movieService
                .findAllGenres()
                .then(function (response){
                    var genres = response.data.genres;
                    for (var g in genres) {
                        if (genres[g].id == genreId) {
                            model.genre = genres[g].name;
                        }
                    }
                });
        }
    }
})();
