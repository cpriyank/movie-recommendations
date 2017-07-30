var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.put("/api/project/messageReceived/:userId", messageReceived);
app.put("/api/project/messageSent/:userId", messageSent);

function messageReceived(req, res) {
    var userId = req.params.userId;
    var message = req.body;
    userModel
        .messageReceived(userId, message)
        .then(function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
}

function messageSent(req, res) {
    var userId = req.params.userId;
    var message = req.body;
    userModel
        .messageSent(userId, message)
        .then(function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
}