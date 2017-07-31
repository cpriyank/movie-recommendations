(function () {
    angular
        .module("Rave")
        .factory("movieService", movieService);

    function movieService($http) {

        var api = {
            searchMoviesByQuery: searchMoviesByQuery,
            findAllGenres: findAllGenres,
            findMovieById: findMovieById,
            findMoviesByGenreId: findMoviesByGenreId,
            findArtistById: findArtistById,
            findMoviesByPopularity: findMoviesByPopularity,
            findMoviesByRevenue: findMoviesByRevenue,
            findMoviesByReleaseDate: findMoviesByReleaseDate
        };


        var key = '589b081b41998d888669a809b0bb1808';
        var authorityUrl = "https://api.themoviedb.org/3";
        var queryUrl = '?api_key=' + key;

        return api;

        function searchMoviesByQuery(query) {
            var url = authorityUrl + "/search/movie" + queryUrl + "&query=" + query;
            return $http.get(url);
        }

        function findMovieById(movieId) {
            var url = authorityUrl + "/movie/" + movieId + queryUrl + "&append_to_response=credits,reviews";
            return $http.get(url);
        }

        function findMoviesByGenreId(genreId) {
            var url = authorityUrl + "/discover/movie" + queryUrl + "&with_genres=" + genreId;
            return $http.get(url);
        }

        function findAllGenres() {
            var url = authorityUrl + '/genre/movie/list' + queryUrl;
            return $http.get(url);
        }

        function findArtistById(artistId) {
            var url = authorityUrl + '/person/' + artistId + queryUrl + '&append_to_response=movie_credits';
            return $http.get(url);
        }

        function findMoviesByPopularity() {
            var url = authorityUrl + '/discover/movie' + queryUrl + '&sort_by=popularity.desc';
            return $http.get(url);
        }

        function findMoviesByRevenue() {
            var url = authorityUrl + '/discover/movie' + queryUrl + '&sort_by=revenue.desc';
            return $http.get(url);
        }

        function findMoviesByReleaseDate() {
            var url = authorityUrl + '/discover/movie' + queryUrl + '&sort_by=release_date.desc';
            return $http.get(url);
        }
    }
})();
