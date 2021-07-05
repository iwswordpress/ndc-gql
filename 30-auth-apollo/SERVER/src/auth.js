const { AuthenticationError } = require('apollo-server');

const authenticated = (next) => (root, args, context, info) => {
	if (!context.user) {
		throw new AuthenticationError('must authenticate');
	}

	return next(root, args, context, info);
};

const authorized = (role, next) => (root, args, context, info) => {
	if (context.user.role !== role) {
		throw new AuthenticationError(`you must have ${role} role`);
	}

	return next(root, args, context, info);
};

module.exports = {
	authenticated,
	authorized,
};
