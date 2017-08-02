(function () {
    angular
        .module("Rave")
        .factory("mediaService", mediaService);

    function mediaService($http) {

        var api = {
            createMovie: createMovie,
            findMovieById: findMovieById,
            findMovieByObjectId: findMovieByObjectId
        };

        return api;

        function createMovie(movie){
            var url = "/api/project/movie";
            return $http.post(url, movie);
        }

        function findMovieById(movieId) {
            var url = "/api/project/movies/" + movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findMovieByObjectId(objectId) {
            var url = "/api/project/movieByOId/" + objectId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();