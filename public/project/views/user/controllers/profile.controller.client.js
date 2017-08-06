(function () {
    angular
        .module('Rave')
        .controller('profileController', profileController);

    function profileController($location,
                               $route,
                               $routeParams,
                               currentUser,
                               userService,
                               reviewService,
                               messageService,
                               mediaService) {

        var model = this;
        model.currentUser = currentUser;
        model.currentUserId = currentUser._id;
        model.profileUser = $routeParams['username'];
        model.followCritic = followCritic;
        model.unfollowCritic = unfollowCritic;
        model.findFavoriteMovies = findFavoriteMovies;
        model.findFollowing = findFollowing;
        model.findFollowers = findFollowers;
        model.toFollowOrToUnFollow = toFollowOrToUnFollow;
        model.createMessage = createMessage;
        model.findReviewsByUserId = findReviewsByUserId;

        function init() {
            userService
                .findUserByUsername(model.profileUser)
                .then(renderUser,userError);
        }
        init();

        function renderUser (user) {
            model.user = user;
            model.profileId = user._id;
            findFavoriteMovies(user);

            if (user.role === 'Viewer') {
                findFollowing(user);
            }
            if (user.role === 'Critic') {
                findFollowers(user);
                toFollowOrToUnFollow();
                findReviewsByUserId();
            }

        }

        function findFavoriteMovies(user) {
            model.favorites = [];
            for(var f in user.favorites) {
                mediaService
                    .findMovieByObjectId(user.favorites[f])
                    .then(function (movie) {
                        model.favorites.push(movie);
                    });
            }
        }

        function findReviewsByUserId() {
            reviewService
                .findReviewsByUserId(model.user._id)
                .then(function (reviews) {
                    model.reviews = reviews;
                }, function (err) {
                });
        }

        function findFollowing(user) {
            model.following = [];
            for(var f in user.following) {
                userService
                    .findUserById(user.following[f])
                    .then(function (critic) {
                        model.following.push(critic);
                    });
            }
        }

        function findFollowers(user) {
            model.followers = [];
            for(var f in user.followers) {
                userService
                    .findUserById(user.followers[f])
                    .then(function (critic) {
                        model.followers.push(critic);
                    });
            }
        }

        function userError(error) {
            model.error = "User not found";
        }

        function followCritic() {
            userService
                .findUserById(model.currentUserId)
                .then(function (response) {
                    var following = response.following;
                    for(var f in following){
                        if (following[f] === model.profileId){
                            model.error = "You are already following this user.";
                            return;
                        }
                    }
                    userService
                        .findUserByUsername(model.profileUser)
                        .then(function (response) {
                            var following = {userId: response._id};
                            userService
                                .followCritic(model.currentUserId, following)
                                .then(function (res) {
                                    model.message = "You are now following this critic!";
                                    model.toFollowOrToUnfollow = true;
                                });
                        });

                });
        }

        function unfollowCritic() {
            userService
                .findUserByUsername(model.profileUser)
                .then(function (response) {
                    var unfollow = {userId: response._id};
                    userService
                    .unfollowCritic(model.currentUserId, unfollow)
                        .then(function (res) {
                            model.message = "You have successfully unfollowed!";
                            model.toFollowOrToUnfollow = false;
                        });
                });
        }

        function toFollowOrToUnFollow() {
            model.toFollowOrToUnfollow = false;
            userService
                .findUserById(model.currentUserId)
                .then(function (response) {
                    var following = response.following;
                    for (var f in following) {
                        if (following[f] === model.profileId) {
                            model.toFollowOrToUnfollow = true;
                            return;
                        }
                    }
                });
        }

        function createMessage(message) {

            if (currentUser._id === model.user._id)
                return;

            var messageSent = {
                userId: model.user._id,
                username: model.user.username,
                message: message
            };

            // console.log("Sent: " + messageSent);

            var messageReceived = {
                userId: currentUser._id,
                username: currentUser.username,
                message: message
            };

            // console.log("Rec: " + messageReceived);

            messageService
                .messageSent(currentUser._id, messageSent)
                .then(function (response) {
                    // console.log(response);
                    messageService
                        .messageReceived(model.user._id, messageReceived)
                        .then(function (res) {
                            model.message = "Message Sent!";
                        });
                }, function (error) {
                    // console.log("Error: " +error.data);
                });
        }
    }
})();
