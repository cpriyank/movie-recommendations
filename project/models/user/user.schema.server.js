var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    bio: String,
    role: {
        type: String,
        default: 'Viewer',
        enum: ['Viewer', 'Critic', 'Admin']
    },
    google: {
        id: String,
        token: String
    },
    // twitter: {
    //     id:    String,
    //     token: String
    // },
    email: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"RaveUser"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"RaveUser"}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref:"RaveMovie"}],
    messageReceived: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"RaveUser"},
        username: String,
        message: String
    }],
    messageSent: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"RaveUser"},
        username: String,
        message: String
    }],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;
