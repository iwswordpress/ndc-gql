const { AuthenticationError } = require('apollo-server');

const authenticated = (next) => (root, args, context, info) => {
	if (!context.user) {
		throw new AuthenticationError('Please login to use this feature.');
	}

	return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
	if (context.user.role !== role) {
		throw new AuthenticationError(`You must have ${role} role to use this feature`);
	}

	return next(root, args, context, info);
};

module.exports = {
	authenticated,
	authorized,
};
