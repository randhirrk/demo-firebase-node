const { validationResult } = require('express-validator');
const admin = require('../configs/firebaseService');

exports.createUser = async (req, res) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    if(errors.length) {
        return res.status(422).send({ status: false, msg: 'Validation errors.', result: errors })
    }

    const { email, password, firstName, lastName, phoneNumber } = req.body;

    try {
        const user = await admin.auth().createUser({
            email,
            password,
            displayName: firstName + " " + lastName,
            phoneNumber
        });
        return res.status(200).send({ status: true, msg: 'User registered successfully.', result: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, msg: 'Something went wrong!', result: [] })
    }
}

exports.getUserByEmail = async (req, res) => {
    const validations = validationResult(req);

    if(validations.errors.length) {
        return res.status(422).send({ status: false, msg: 'Validation errors.', result: validations.errors })
    }

    try {
        const user = await admin.auth().getUserByEmail(req.body.email);
        return res.status(200).send({ status: true, msg: 'User details.', result: user });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: 'Something went wrong!', result: [] })
    }
}

exports.newArticle = async(req, res) => {
    try {
        const db = admin.firestore();
        let data = {
            title: 'Corona updates India-',
            body: 'Total new cases in India becomes 12000.',
            created_at: new Date()
        };

        let article = await db.collection('articles').doc().set(data);
        return res.status(200).send({ status: true, msg: 'Article created successfully.', result: article });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: 'Something went wrong!', result: [] })
    }
}