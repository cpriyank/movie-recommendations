var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findAllReviews = findAllReviews;
reviewModel.findReviewById = findReviewById;
reviewModel.findReviewsByMovieId = findReviewsByMovieId;
reviewModel.findReviewsByUserId = findReviewsByUserId;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewByFor = findReviewByFor;
reviewModel.updateReview = updateReview;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel.create(review);
}

function findReviewById(reviewId) {
    return reviewModel.findOne({_id: reviewId});
}

function findAllReviews() {
    return reviewModel.find();
}

function findReviewsByMovieId(movieId) {
    return reviewModel.find({movieId: movieId});
}

function findReviewsByUserId(userId) {
    return reviewModel.find({userId: userId});
}

function deleteReview(reviewId) {
    return reviewModel.remove({_id: reviewId});
}

function findReviewByFor(userId, movieId) {
    return reviewModel.findOne({userId: userId, movieId: movieId});
}

function updateReview(reviewId, review) {
    return reviewModel.update({_id: reviewId}, {$set: review});
}