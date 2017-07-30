var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport      = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;

var googleConfig = {
	clientID     : process.env.GOOGLE_CLIENT_ID,
	clientSecret : process.env.GOOGLE_CLIENT_SECRET,
	callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

// var facebookConfig = {
// 	clientID     : process.env.FACEBOOK_CLIENT_ID,
// 	clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
// 	callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
// 	profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
// };

// var twitterConfig = {
// 	clientID     : process.env.TWITTER_CONSUMER_ID,
// 	clientSecret : process.env.TWITTER_CONSUMER_SECRET,
// 	callbackURL  : process.env.TWITTER_CALLBACK_URL
// };

// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
// passport.use(new TwitterStrategy(twitterConfig, twitterStrategy));

app.get ('/api/project/user/:userId', findUserById);
app.get ('/api/project/user', isAdmin, findAllUsers);
app.get ('/api/project/user/username/:username', findUserByUsername);
app.post('/api/project/user', isAdmin, createUser);
app.put ('/api/project/user/:userId', updateUser);

app.delete ('/api/project/user/:userId', isAdmin, deleteUser);
app.post("/api/project/following/:userId", followCritic);
app.put("/api/project/unfollow/:userId", unfollowCritic);
app.put('/api/project/favorites/:userId/:movieId', addMovieToFavorites);

app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get   ('/api/project/loggedin', loggedin);
app.get   ('/api/project/checkAdmin', checkAdmin);

app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);
app.post  ('/api/project/unregister', unregister);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/project/#!/profile/edit',
		failureRedirect: '/project/#!/login'
	}));

// app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// app.get('/auth/facebook/callback',
// 	passport.authenticate('facebook', {
// 		successRedirect: '/project/#!/profile/edit',
// 		failureRedirect: '/project/#!/login'
// 	}));

// app.get ('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

// app.get('/auth/twitter/callback',
// 	passport.authenticate('twitter', {
// 		successRedirect: '/project/#!/profile/edit',
// 		failureRedirect: '/project/#!/login'
// 	}));

// function facebookStrategy(token, refreshToken, profile, done) {
// 	userModel
// 		.findUserByFacebookId(profile.id)
// 		.then(function (user) {
// 			if (user) {
// 				return done(null, user);
// 			} else {
// 				var names = profile.displayName.split(" ");
// 				var newUser = {
// 					firstName:  names[0],
// 					lastName:  names[1],
// 					facebook: {
// 						id:    profile.id,
// 						token: token
// 					},
// 					role: 'Viewer',
// 					email: profile.emails[0].value,
// 					username: profile.emails[0].value
// 				};
// 				userModel
// 					.createUser(newUser)
// 					.then(function (user) {
// 						return done(null, user);
// 					}, function (err) {
// 						return done(err, null);
// 					});
// 			}
// 		}, function (err) {
// 			return done(err, null);
// 		});
// }

function googleStrategy(token, refreshToken, profile, done) {
	userModel
		.findUserByGoogleId(profile.id)
		.then(
			function(user) {
				if(user) {
					return done(null, user);
				} else {
					var email = profile.emails[0].value;
					var emailParts = email.split("@");
					var newGoogleUser = {
						username:  emailParts[0],
						firstName: profile.name.givenName,
						lastName:  profile.name.familyName,
						email:     email,
						role: 'Viewer',
						google: {
							id:    profile.id,
							token: token
						}
					};
					return userModel.createUser(newGoogleUser);
				}
			},
			function(err) {
				if (err) { return done(err); }
			}
		)
		.then(
			function(user){
				return done(null, user);
			},
			function(err){
				if (err) { return done(err); }
			}
		);
}

// function twitterStrategy(token, refreshToken, profile, done) {
// 	userModel
// 		.findUserByTwitterId(profile.id)
// 		.then(function (user) {
// 			if (user) {
// 				return done(null, user);
// 			} else {
// 				var names = profile.displayName.split(" ");
// 				var newUser = {
// 					firstName:  names[0],
// 					lastName:  names[1],
// 					twitter: {
// 						id:    profile.id,
// 						token: token
// 					},
// 					role: 'Viewer',
// 					email: profile.emails[0].value,
// 					username: profile.emails[0].value
// 				};
// 				userModel
// 					.createUser(newUser)
// 					.then(function (user) {
// 						return done(null, user);
// 					}, function (err) {
// 						return done(err, null);
// 					});
// 			}
// 		}, function (err) {
// 			return done(err, null);
// 		});
// }

function isAdmin(req, res, next) {
	if(req.isAuthenticated() && req.user.role === 'Admin') {
		next();
	} else {
		res.sendStatus(401);
	}
}

function register(req, res) {
	var userObj = req.body;
	userObj.password = bcrypt.hashSync(userObj.password);
	userModel
		.createUser(userObj)
		.then(function (user) {
			req
				.login(user, function (status) {
					res.send(status);
				});
		});
}

function unregister(req, res) {
	userModel
		.deleteUser(req.user._id)
		.then(function (user) {
			req.logout();
			res.sendStatus(200);
		});
}

function logout(req, res) {
	req.logout();
	res.sendStatus(200);
}

function loggedin(req, res) {
	if(req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.send('0');
	}
}

function checkAdmin(req, res) {
	if(req.isAuthenticated() && req.user.role === 'Admin') {
		res.json(req.user);
	} else {
		res.send('0');
	}
}

function localStrategy(username, password, done) {
	userModel
		.findUserByUsername(username) // findUserByCredentials(username, password)
		.then(function (user) {
			if(user && bcrypt.compareSync(password, user.password)) {
				done(null, user);
			} else {
				done(null, false);
			}
		}, function (error) {
			done(error, false);
		});
}

function login(req, res) {
	res.json(req.user);
}

function deleteUser(req, res) {
	var userId = req.params.userId;
	userModel
		.deleteUser(userId)
		.then(function (status) {
			res.send(status);
		});
}

function updateUser(req, res) {
	var user = req.body;
	var userId = req.params.userId;
	if (user.role !== "Viewer" && user.role !== "Critic" && user.role !== "Admin") {
		user.role = "Viewer";
	}
	userModel
		.updateUser(userId, user)
		.then(function (status) {
			res.sendStatus(200);
		}, function (err) {
			res.sendStatus(404);
		});
}

function createUser(req, res) {
	var user = req.body;

	userModel
		.createUser(user)
		.then(function (user) {
			res.json(user);
		}, function (err) {
			res.send(err);
		});
}

function findUserById(req, res) {
	var userId = req.params.userId;
	userModel
		.findUserById(userId)
		.then(function (user) {
			res.json(user);
		});

}

function findAllUsers(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	if(username && password) {
		userModel
			.findUserByCredentials(username, password)
			.then(function (user) {
				if(user) {
					res.json(user);
				} else {
					res.sendStatus(404);
				}
			});
	} else if(username) {
		userModel
			.findUserByUsername(username)
			.then(function (user) {
				if(user) {
					res.json(user);
				} else {
					res.sendStatus(404);
				}
			});
	} else {
		userModel
			.findAllUsers()
			.then(function (users) {
				res.json(users);
			});
	}
}

function findUserByCredentials(req, res) {

	var username = req.query.username;
	var password = req.query.password;

	userModel
		.findUserByCredentials(username, password)
		.then(function (user) {
			if(user != null) {
				res.json(user);
			} else {
				res.sendStatus(404);
			}
		}, function (err) {
			res.sendStatus(404);
		});
}

function findUserByUsername(req, res) {
	var username = req.params.username;
	userModel
		.findUserByUsername(username)
		.then(function (user) {
			if(user) {
				res.json(user);
			} else {
				res.sendStatus(404);
			}
		}, function (err) {
			res.sendStatus(401);
		});
}

function serializeUser(user, done) {
	done(null, user);
}

function deserializeUser(user, done) {
	userModel
		.findUserById(user._id)
		.then(
			function(user){
				done(null, user);
			},
			function(err){
				done(err, null);
			}
		);
}

function followCritic(req, res) {
	var userId = req.params.userId;
	var following = req.body;
	userModel
		.followCritic(userId, following.userId)
		.then(
			function (response) {
				res.sendStatus(200);
			},
			function (error) {
				res.sendStatus(404);
			}
		);
}

function unfollowCritic(req, res) {
	var userId = req.params.userId;
	var unfollow = req.body;

	userModel
		.unfollowCritic(userId, unfollow.userId)
		.then(
			function (response) {
				res.sendStatus(200);
			},
			function (error) {
				res.sendStatus(404);
			}
		);
}

function addMovieToFavorites(req, res) {
	var userId = req.params.userId;
	var movieId = req.params.movieId;
	userModel
		.addMovieToFavorites(userId, movieId)
		.then(function (response) {
			res.sendStatus(200);
		},
			function (error) {
				res.sendStatus(404);
			});
}
