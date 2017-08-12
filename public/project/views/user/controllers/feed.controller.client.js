(function () {
    angular
        .module('Rave')
        .controller('feedController', feedController);

    function feedController($location,
                            $route,
                            $routeParams,
                            currentUser,
                            userService,
                            movieService,
                            reviewService) {

        var model = this;
        model.currentUser = currentUser;
        model.feedReviews = [];

        function init() {
            renderFeed();
        }
        init();

        function renderFeed () {
            for(var f in currentUser.following) {
                userService
                    .findUserById(currentUser.following[f])
                    .then (function (critic) {
                        reviewService
                            .findReviewsByUserId(critic._id)
                            .then(function (reviews) {
                                // console.log("reviews array", reviews);
                                for(var i in reviews) {
                                    // console.log("i mo review", reviews[i]);
                                    movieService
                                        .findMovieById(reviews[i].movieId)
                                        .then (function (movie) {
                                            // console.log("movie chhe", movie);
                                            var reviewMovie = {"firstName": critic.firstName, "lastName": critic.lastName, "reviewed": movie.data.title, "review": reviews[i].review};
                                            model.feedReviews.push(reviewMovie);
                                        });
                                }
                            });
                    });
            }
            // console.log("kai to chhe", model.feedReviews);
        }

    }
})();
