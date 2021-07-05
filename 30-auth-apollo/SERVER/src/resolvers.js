const { AuthenticationError } = require('apollo-server');

const { authenticated, authorized } = require('./auth');
const token = require('./util');

module.exports = {
	Query: {
		myDetails: authenticated((_, __, { user }) => {
			return user;
		}),
	},
	Mutation: {
		signup(_, { input }, { user }) {
			console.log('User:', user);
			console.log('input:', input);
			console.log('Welcome...');

			if (user) {
				throw new AuthenticationError('SIGNUP not allowed as you are not registered ');
			}

			return { user: { id: 1, email: input.email, role: 'MEMBER', token: `${token(1)}` } };
		},
		signin(_, { input }, { user }) {
			if (!user) {
				throw new AuthenticationError('wrong email + password combo');
			}
			return { user };
		},
	},
};
