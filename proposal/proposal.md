# Project Proposal

This project aims to build a machine learning driven movie recommendation engine akin to recommendation feature of Netflix.

## Landing Page
On the landing page, anonymous users will be able to browse through the movie collection and view details based on fields of movie object.

## Members

Member users will be able to follow or message each other and manage a collection with personal ratings. Based on ratings, users will be given recommendations.

Members may be producers of movies, critics, or ordinary viewers.

As the number of users is not expected to be large enough to train an acceptable learner, pre trained models based on Tensor Factorization or [several novel deep learning based recommendation methods](https://github.com/robi56/Deep-Learning-for-Recommendation-Systems/blob/master/README.md) will be used.

## Movies

Movies will have several attributes like cast, genre, etc.

## Technologies to be used
  - Apart from the fundamental MEAN components, a third-party movie API will be used to get movie data.
  - Based on the project time frame, recommendation system may be outsourced to third-party API.
  - For generating boilerplate code, one of the [yeoman](http://yeoman.io/) generators may be used.
  - Angular Material will be used for building a tactile, responsive user interface.
  - [Jasmine](https://github.com/jasmine/jasmine) and [Chai](http://chaijs.com/) will be used for testing.