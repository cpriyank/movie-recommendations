var mongoose = require('mongoose');

var connectionString =  null;
if (process.env.MONGODB_URI) {
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds153521.mlab.com:53521/heroku_vlhjwznw';
}
else
{
    connectionString = 'mongodb://localhost/rave';
}

mongoose.connect(connectionString);

mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/movie.service.server');
require('./services/review.service.server');
require('./services/message.service.server');
