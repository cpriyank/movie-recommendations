var app = require('../../express');
var reviewModel = require('../models/review/review.model.server');

app.get('/api/project/review/:reviewId', findReviewById);
app.get('/api/project/reviews', findAllReviews);
app.get('/api/project/reviewsBy/:userId', findReviewsByUserId);
app.get('/api/project/reviewsFor/:movieId', findReviewsByMovieId);
app.get('/api/project/reviewByFor/:userId/:movieId', findReviewByFor);
app.post('/api/project/review', createReview);
app.delete ('/api/project/review/:reviewId', deleteReview);
app.put ('/api/project/review', updateReview);

function updateReview(req, res) {
	var review = req.body;
	reviewModel
		.updateReview(review._id, review)
		.then(function (res) {
			res.sendStatus(200);
		}, function (err) {
			res.sendStatus(404);
		});
}

function findReviewById(req, res){
	var reviewId = req.params.reviewId;
	reviewModel
		.findReviewById(reviewId)
		.then(function (review) {
			res.json(review);
		},
			function (error) {
				res.sendStatus(404).send(error);
			});
}

function findAllReviews(req, res) {
	reviewModel
		.findAllReviews()
		.then(function (reviews) {
			res.json(reviews);
		},
			function (error) {
				res.sendStatus(404).send(error);
			}
		);
}

function createReview(req,res) {
	var review = req.body;
	reviewModel
		.createReview(review)
		.then(
			function(review){
				res.json(review);
			},
			function(error){
				res.sendStatus(404).send(error);
			}
		)
}

function deleteReview(req,res) {
	var reviewId = req.params.reviewId;
	reviewModel
		.deleteReview(reviewId)
		.then(
			function(status){
				res.send(status);
			},
			function(error){
				res.sendStatus(404).send(error);
			}
		)
}

function findReviewsByUserId(req, res) {
	var userId = req.params.userId;
	reviewModel
		.findReviewsByUserId(userId)
		.then(function (reviews) {
			res.json(reviews);
		},
			function (error) {
				res.sendStatus(404).send(error);
			}
		);
}

function findReviewsByMovieId(req, res) {
	var movieId = req.params.movieId;
	reviewModel
		.findReviewsByMovieId(movieId)
		.then(function (reviews) {
        // console.log(reviews);
			res.json(reviews);
		},
			function (error) {
				res.sendStatus(404).send(error);
			}
		);
}

function findReviewByFor(req, res) {
	var userId = req.params.userId;
	var movieId = req.params.movieId;
	reviewModel
		.findReviewByFor(userId, movieId)
		.then(function (review) {
			res.json(review);
		},
			function (error) {
				res.sendStatus(404).send(error);
			}
		);
}
