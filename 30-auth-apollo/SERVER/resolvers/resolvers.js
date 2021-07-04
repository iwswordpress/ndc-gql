const fetch = require('node-fetch');

const JSON_URL = 'http://localhost:4010';
const Query = {
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
};
const Mutation = {
	createUser: async function ({ userInput }, req) {
		return {
			id: `${Math.floor(Math.random() * 100 + 1)}`,
		};
	},
};
module.exports = { Query, Mutation };
