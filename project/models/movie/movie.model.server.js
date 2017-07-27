var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('RaveMovie', movieSchema);

movieModel.createMovie = createMovie;
movieModel.findAllMovies = findAllMovies;
movieModel.findMovieById = findMovieById;
movieModel.addRating = addRating;
movieModel.addReview = addReview;
movieModel.findMovieByObjectId = findMovieByObjectId;

module.exports = movieModel;

function createMovie(movie) {
    return movieModel.create(movie);
}

function findMovieById(movieId) {
    return movieModel.findOne({movieId: movieId});
}

function findMovieByObjectId(movieId) {
    return movieModel.findOne({_id: movieId});
}

function findAllMovies() {
    return movieModel.find();
}

function addRating(movieId, rating) {
    return movieModel.update({'movieId': movieId}, {$push:{ratings:rating.rating}});
}

function addReview(movieId, review) {
    return movieModel.update({'movieId': movieId}, {$push: {reviews: review.review}});
}
