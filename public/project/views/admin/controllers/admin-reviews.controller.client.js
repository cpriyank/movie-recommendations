(function () {
    angular
        .module('Rave')
        .controller('adminReviewsController', adminReviewsController);

    function adminReviewsController(reviewService, currentUser) {
        var model = this;
        model.deleteReview = deleteReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.renderError = renderError;
        model.currentUser = currentUser;
        function init() {
            findAllReviews();
        }
        init();

        function selectReview(review) {
            model.review = angular.copy(review);
        }

        function updateReview(review) {
            reviewService
                .updateReview(review)
                .then(findAllReviews)
                .then(function () {
                    model.message = "Updated review";
                });
        }

        function deleteReview(review) {
            reviewService
                .deleteReview(review._id)
                .then(findAllReviews)
                .then(function () {
                    model.message = "Deleted review";
                });
        }

        function findAllReviews() {
            reviewService
                .findAllReviews()
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }

        function renderError(error) {
            model.message = "Oops! Couldn't fulfill that command";
        }
    }
})();
