const admin = require('../configs/firebaseService');

const getAuthToken = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
        req.authToken = req.headers.authorization.split(" ")[1];
    } else {
        req.authToken = null;
    }
    next();
}

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            if(req.headers.authorization && req.headers.authorization.split(" ")[0] == 'Bearer') {
                req.authToken = req.headers.authorization.split(" ")[1];
            } else {
                req.authToken = null;
            }
            const userInfo = await admin.auth().verifyIdToken(req.authToken);
            req.authId = userInfo.id;
            return next();
        } catch (error) {
            return res.status(401).send({ status: false, msg: 'You are not authorized to make this request' });
        }
    })
}

module.exports = {
    checkIfAuthenticated
}