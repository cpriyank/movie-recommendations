(function () {
    angular
        .module('Rave')
        .controller('movieController', movieController);

    function movieController(movieService,
                             mediaService,
                             userService,
                             reviewService,
                             currentUser,
                             $routeParams) {
        var model = this;

        model.movieId = $routeParams.movieId;
        model.currentUser = currentUser;
        model.currentUserId = currentUser._id;

        model.findMovieById = findMovieById;
        model.createMovie = createMovie;
        model.createReview = createReview;
        model.addMovieToFavorites = addMovieToFavorites;
        model.findMovieObjectId = findMovieObjectId;
        model.findReviewsByMovieId = findReviewsByMovieId;
        model.toReviewOrNotToReview = toReviewOrNotToReview;

        function init() {
            findMovieById(model.movieId)
                .then(function (res) {
                    createMovie(res)
                        .then(findReviewsByMovieId);
                })
                .then(toReviewOrNotToReview);
        }

        init();

        function findMovieById(movieId) {
            return movieService
                .findMovieById(movieId)
                .then(function (response) {
                    model.movie = response.data;
                });
        }

        function createMovie(res) {
            return mediaService
                .findMovieById(model.movieId)
                .then(function (response) {
                    if (response == null) {
                        var movie = {
                            movieId: model.movie.id,
                            title: model.movie.title
                        };
                        return mediaService
                            .createMovie(movie);
                    }
                    return;
                },
                function (error) {
                    var movie = {
                        movieId: model.movie.id,
                        title: model.movie.title
                    };
                    return mediaService
                        .createMovie(movie);
                });
        }

        function addMovieToFavorites(movieId) {
            if (currentUser.role !== 'Viewer') {
                return;
            }
            mediaService
                .findMovieById(movieId)
                .then(function (response) {
                    var objectId = response._id;
                    userService
                        .findUserById(model.currentUserId)
                        .then(function (response) {
                            var favorites = response.favorites;
                            for (var f in favorites) {
                                if (favorites[f] === objectId) {
                                    model.error = "You have already favorited this!";
                                    model.message = false;
                                    return;
                                }
                            }
                            userService
                                .addMovieToFavorites(model.currentUserId, objectId)
                                .then(function (response) {
                                        model.message = "Added to Favorites";
                                        model.error = false;
                                    },
                                    function (error) {
                                        model.error = "Unable to Add to Favorites";
                                        model.message = false;
                                    });
                        });
                });

        }

        function findMovieObjectId() {
            return mediaService
                .findMovieById(model.movieId)
                .then(function (response) {
                    model.objectId = response._id;
                });
        }

        function createReview(comment) {
            if(currentUser.role !== 'Critic') {
                return;
            }
            findMovieObjectId()
                .then(function () {
                    reviewService
                        .findReviewByFor(model.currentUserId, model.objectId)
                        .then(function (res) {
                            if(res == null) {
                                var review = {
                                    userId: model.currentUserId,
                                    username: currentUser.username,
                                    movieId: model.objectId,
                                    review: comment
                                };
                                reviewService
                                    .createReview(review)
                                    .then(function (response) {
                                        model.message = "Review posted!";
                                        findReviewsByMovieId();
                                        toReviewOrNotToReview();
                                    }, function (error) {
                                        model.message = "error posting review";
                                    });
                            }
                        },
                        function (err) {
                            var review = {
                                userId: model.currentUserId,
                                username: currentUser.username,
                                movieId: model.objectId,
                                review: comment
                            };
                            reviewService
                                .createReview(review)
                                .then(function (response) {
                                    model.message = "Review posted!";
                                }, function (error) {
                                    model.message = "error posting review";
                                });
                        });
                });

        }

        function findReviewsByMovieId() {
            findMovieObjectId()
                .then(function () {
                    reviewService
                        .findReviewsByMovieId(model.objectId)
                        .then(function (reviews) {
                            model.reviews = reviews;
                        }, function (err) {
                        });
                });

        }

        function toReviewOrNotToReview() {
            if(currentUser.role !== 'Critic') {
                return false;
            }
            findMovieObjectId()
                .then(function () {
                    reviewService
                        .findReviewByFor(model.currentUserId, model.objectId)
                        .then(function (res) {
                            if (res !== null)
                                model.toReviewOrNotToReview = false;
                            else
                                model.toReviewOrNotToReview = true;

                        })
                });
        }
    }
})();
