(function () {
    angular
        .module('Rave')
        .controller('indexController', indexController);

    function indexController(movieService, $location, currentUser) {
        var model = this;
        model.welcome = "Welcome";
        model.currentUser = currentUser;
        model.renderMoviesByRevenue = renderMoviesByRevenue;
        model.renderMoviesByPopularity = renderMoviesByPopularity;
        model.renderMoviesByReleaseDate = renderMoviesByReleaseDate;
        model.renderAllGenres = renderAllGenres;
        model.findGenreById = findGenreById;
        function init() {
            movieService
                .findMoviesByPopularity()
                .then(renderMoviesByPopularity);
            movieService
                .findMoviesByRevenue()
                .then(renderMoviesByRevenue);
            movieService
                .findMoviesByReleaseDate()
                .then(renderMoviesByReleaseDate);
            movieService
                .findAllGenres()
                .then(renderAllGenres);
        }

        init();

        function renderMoviesByRevenue(movies) {
            model.highestGrossing = movies.data.results;
        }

        function renderMoviesByPopularity(movies) {
            model.popular = movies.data.results;
        }

        function renderMoviesByReleaseDate(movies) {
            model.latest = movies.data.results;
        }

        function renderAllGenres(genres) {
            model.genres = genres.data.genres;
        }

        function findGenreById(genreId) {
            for (var g in model.genres) {
                if (model.genres[g].id === genreId){
                    return model.genres[g].name;
                }
            }
            // this should never happen
            return null;
        }

    }
})();
