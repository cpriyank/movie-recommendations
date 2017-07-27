var app = require('../../express');
var movieModel = require('../models/movie/movie.model.server');

app.get('/api/project/movies/:movieId', findMovieById);
app.get('/api/project/movieByOId/:movieId', findMovieByObjectId);
app.get('/api/project/movie', findAllMovies);
app.post('/api/project/movie', createMovie);

function findMovieById(req, res){
    var movieId = req.params.movieId;
    movieModel
        .findMovieById(movieId)
        .then(function (movie) {
            res.json(movie);
        },
        function (error) {
            res.sendStatus(404).send(error);
        });
}

function findMovieByObjectId(req, res){
    var movieId = req.params.movieId;
    movieModel
        .findMovieByObjectId(movieId)
        .then(function (movie) {
                res.json(movie);
            },
            function (error) {
                res.sendStatus(404).send(error);
            });
}

function findAllMovies(req, res) {
    movieModel
        .findAllMovies()
        .then(function (movies) {
                res.json(movies);
            },
            function (error) {
                res.sendStatus(404).send(error);
            }
        );
}

function createMovie(req,res) {
    var movie = req.body;
    movieModel
        .createMovie(movie)
        .then(
            function(movie){
                res.json(movie);
            },
            function(error){
                res.sendStatus(404).send(error);
            }
        );
}