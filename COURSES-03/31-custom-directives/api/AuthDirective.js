const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const requiredRole = this.args.requires;
		const originalResolve = field.resolve || defaultFieldResolver;

		field.resolve = async function (...args) {
			// ...args === parent, args, ctx, info
			let data;
			const queryId = args[1].id;
			console.log('queryId', queryId);
			const context = args[2];

			const id = context.user.id || 0;
			const firstName = context.user.firstName || {};
			const role = context.user.role || {};
			const token = context.user.token || {};
			const customNDCHeader = context.user.customNDCHeader;
			const isCurrentUser = context.id === queryId;
			console.log('CUSTOM DIRECTIVES----------------');
			console.log(
				'AUTH DIRECTIVE > USER:',
				'\nid',
				id,
				'\nfirstName',
				firstName,
				'\nrole',
				role,
				'\ntoken',
				token,
				'\nCustomNDCHeader',
				customNDCHeader,
				'\nisCurrentUser',

				isCurrentUser,
			);

			const isAuthorized = role === 'ADMIN';
			if (!isAuthorized) {
				throw new AuthenticationError(`You need following role: ${requiredRole}`);
			} else {
				console.log(`${firstName} with role of ${role} is AUTHORIZED`);
			}
			if (!isCurrentUser || !isAuthorrized) {
				console.log(`${id} ${firstName} is current owner.`);
				data = await originalResolve.apply(this, args);
			}

			return data;
		};
	}
}

module.exports = AuthDirective;
