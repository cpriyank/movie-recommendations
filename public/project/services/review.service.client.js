(function () {
    angular
        .module("Rave")
        .factory("reviewService", reviewService);

    function reviewService($http) {

        var api = {
            createReview: createReview,
            findReviewById: findReviewById,
            findAllReviews: findAllReviews,
            findReviewsByMovieId: findReviewsByMovieId,
            findReviewsByUserId: findReviewsByUserId,
            deleteReview: deleteReview,
            findReviewByFor: findReviewByFor,
            updateReview: updateReview
        };

        return api;

        function createReview(review){
            var url = "/api/project/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewById(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllReviews() {
            var url = "/api/project/reviews";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsByMovieId(movieId) {
            var url = "/api/project/reviewsFor/" + movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsByUserId(userId) {
            var url = "/api/project/reviewsBy/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewByFor(userId, movieId) {
            var url = "/api/project/reviewByFor/" + userId + "/" + movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(review) {
            var url = "/api/project/review";
            return $http.put(url, review);
        }

    }
})();
