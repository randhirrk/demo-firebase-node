var express = require('express');
var router = express.Router();

const { checkIfAuthenticated } = require('../middlewares/auth');
const { createUser, getUserByEmail, newArticle } = require('../controllers/auth');
const { signupValidation, emailValidation } = require('../middlewares/validation');

router.post('/auth/signup', signupValidation, createUser);
router.post('/getUserByEmail', emailValidation, getUserByEmail);

router.get('/articles', checkIfAuthenticated, (req, res) => {
    return res.send("articles...");
})

router.get('/createArticle', newArticle)

module.exports = router;