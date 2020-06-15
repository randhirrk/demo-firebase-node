const functions = require('firebase-functions');
var app = require('./app');

exports.tmpApp = functions.https.onRequest(app);
