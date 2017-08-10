(function () {
    angular
        .module('Rave')
        .controller('searchController', searchController);

    function searchController(movieService, currentUser, $routeParams) {
        var model = this;

        model.query = $routeParams.query;
        model.renderSearchResults = renderSearchResults;
        model.renderAllGenres = renderAllGenres;
        model.findGenreById = findGenreById;
        model.currentUser = currentUser;
        function renderSearchResults(movies) {
            model.movies = movies.data.results;
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
        }

        function init() {
            movieService
                .searchMoviesByQuery(model.query)
                .then(renderSearchResults);
            movieService
                .findAllGenres()
                .then(renderAllGenres);
        }

        init();
    }
})();
