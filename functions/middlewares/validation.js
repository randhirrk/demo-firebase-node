const { check } = require('express-validator');

exports.signupValidation =  [
	check('email')
		.trim().not().isEmpty().withMessage('Email is required.')
		.isEmail().withMessage('Invalid email.'),	
	check('password')
		.trim().not().isEmpty().withMessage('Password is required.')
		.isLength({ min: 5 }).withMessage('The password must be 5+ chars long.'),
	check('firstName').trim().not().isEmpty().withMessage('First name is required.'),
	check('lastName').trim().not().isEmpty().withMessage('Last name is required.'),
	check('phoneNumber')
		.trim().not().isEmpty().withMessage('Phone number is required.')
		.matches(/\d/).withMessage('The phone number must be a number.')
		.isLength({ min: 8 }).withMessage('The phone number must be 8 chars long.')
];

exports.emailValidation = [
	check('email')
		.trim().not().isEmpty().withMessage('Email is required.')
		.isEmail().withMessage('Invalid email.')
];