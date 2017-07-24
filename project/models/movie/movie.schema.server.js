var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    movieId: Number,
    title: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "movie"});

module.exports = movieSchema;