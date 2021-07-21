const { AuthenticationError } = require('apollo-server');

const authenticated = (next) => (root, args, context, info) => {
	console.log('auth > authenticated> args', args);
	console.log('auth > authenticated> ctx', context.user);

	if (context.user.token.substring(0, 5) != 'TOKEN') {
		throw new AuthenticationError('You must have a valid AUTH TOKEN...');
	}
	return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
	if (context.user.role !== role) {
		throw new AuthenticationError(`You must have a role of ${role}`);
	}

	return next(root, args, context, info);
};

module.exports = {
	authenticated,
	authorized,
};
