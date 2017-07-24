var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"RaveUser"},
    username: String,
    movieId: {type: mongoose.Schema.Types.ObjectId, ref:"RaveMovie"},
    review: String,
    flagged: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;