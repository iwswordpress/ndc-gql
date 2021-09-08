const { AuthenticationError } = require('apollo-server');
const colors = require('colors');

const authenticated = (resolver) => (parent, args, context, info) => {
	console.log('auth > authenticated> args', args);
	console.log('auth > authenticated> ctx', context.user);

	if (context.user.token.substring(0, 5) != 'TOKEN') {
		throw new AuthenticationError('You must have a valid AUTH TOKEN...');
	}
	return resolver(parent, args, context, info);
};

const authorized = (role, next) => (parent, args, context, info) => {
	if (context.user.role !== role) {
		throw new AuthenticationError(`You must have a role of ${role}`);
	}

	return next(parent, args, context, info);
};

module.exports = {
	authenticated,
	authorized,
};
