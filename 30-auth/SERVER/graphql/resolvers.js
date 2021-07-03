const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = {
	createUser: async function ({ userInput }, req) {
		//   const email = args.userInput.email;
		const errors = [];
		if (!validator.isEmail(userInput.email)) {
			errors.push({ message: 'E-Mail is invalid.' });
		}
		if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
			errors.push({ message: 'Password too short!' });
		}
		if (errors.length > 0) {
			const error = new Error('Invalid input.');
			error.data = errors;
			error.code = 422;
			throw error;
		}
	},
	login: async function ({ email, password }) {
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Password is incorrect.');
			error.code = 401;
			throw error;
		}
		const token = jwt.sign(
			{
				userId: user._id.toString(),
				email: user.email,
			},
			'somesupersecretsecret',
			{ expiresIn: '1h' },
		);
		return { token: token, userId: '3' };
	},

	user: async function (args, req) {
		if (!req.isAuth) {
			const error = new Error('Not authenticated!');
			error.code = 401;
			throw error;
		}

		return {};
	},
};
