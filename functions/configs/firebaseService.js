const admin = require('firebase-admin');
var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-chromeinfo.firebaseio.com'
})

module.exports = admin;