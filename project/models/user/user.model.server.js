var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('RaveUser', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
// userModel.findUserByFacebookId = findUserByFacebookId;
// userModel.findUserByTwitterId = findUserByTwitterId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.followCritic = followCritic;
userModel.unfollowCritic = unfollowCritic;
userModel.addMovieToFavorites = addMovieToFavorites;
userModel.messageReceived = messageReceived;
userModel.messageSent = messageSent;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

// function findUserByFacebookId(facebookId) {
//     return userModel.findOne({'facebook.id': facebookId});
// }

// function findUserByTwitterId(twitterId) {
//     return userModel.findOne({'twitter.id': twitterId});
// }

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if(typeof newUser.roles === 'string')
        newUser.roles = newUser.roles.split(',');
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function followCritic(userId, follow) {
    return userModel
        .findById(userId)
        .then(function (user) {
            // console.log(user);
            user.following.push(follow);
            return user.save();
        })
        .then(function (user) {
            userModel
                .findById(follow)
                .then(function (critic) {
                    // console.log(ahi avya);
                    critic.followers.push(userId);
                    critic.save();
                });
        });
}

function unfollowCritic(userId, unfollow) {
    return userModel
        .findById(userId)
        .then(function (user) {
            // console.log(user.following);
            var index = user.following.indexOf(unfollow);
            user.following.splice(index, 1);
            return user.save();
        })
        .then(function (user) {
            userModel
                .findById(unfollow)
                .then(function (critic) {
                    var i = critic.followers.indexOf(userId);
                    critic.followers.splice(i, 1);
                    critic.save();
                });
        });
}

function addMovieToFavorites(userId, movieId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.favorites.push(movieId);
            return user.save();
        });
}

function messageReceived(userId, message) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.messageReceived.push(message);
            // console.log(message);
            return user.save();
        });
}

function messageSent(userId, message) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.messageSent.push(message);
            return user.save();
        });
}
