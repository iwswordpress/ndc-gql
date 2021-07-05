const { AuthenticationError } = require('apollo-server');

const { authenticated, authorized } = require('./auth');

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
	Query: {
		me: authenticated((_, __, { user }) => {
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

			return { user: { email: input.email, role: input.role } };
		},
		signin(_, { input }, { user }) {
			if (!user) {
				throw new AuthenticationError('wrong email + password combo');
			}
			return { user };
		},
	},
};
