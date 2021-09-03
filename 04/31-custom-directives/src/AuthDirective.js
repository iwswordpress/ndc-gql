const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const requiredRole = this.args.requires;
		//  requires is dev defined in Schema...
		// 	type Query {
		// 	   viewUser(id: Int): User @auth(requires: ADMIN)
		//  }

		const originalResolve = field.resolve || defaultFieldResolver; // just in case there is no resolver

		field.resolve = async function (parent, args, context, info) {
			// ...arguments can be used and then queryId = arguments[1].id and context = arguments[2]
			// then in apply bind we can just pass args rather than [parent, args. context, info]
			// NB ...args is JS

			let data;
			const queryId = args.id;
			console.log('queryId', queryId);

			const id = context.user.id || 0;
			const firstName = context.user.firstName || {};
			const role = context.user.role || {};
			const token = context.user.token || {};
			const customNDCHeader = context.user.customNDCHeader;
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
			);

			// Various ways to code this but we check first if authenticated
			// If no token, data will end up being null
			if (context.user.token.substring(0, 5) == 'TOKEN') {
				// token = 'TOKEN-NAME' so a demo way of seeing if user is AUTHENTICATED
				console.log('+++++ AUTHENTICATION +++++');
				console.log(`ID: ${id} - ${firstName} has a valid TOKEN...`);
				data = await originalResolve.apply(this, [parent, args, context, info]);
			}

			// Additional checks...
			const isAuthorized = role === 'ADMIN';
			if (!isAuthorized) {
				throw new AuthenticationError(`You need following role: ${requiredRole}`);
			} else {
				console.log('+++++ AUTHORIZATION +++++');
				console.log(`${firstName} with role of ${role} is AUTHORIZED`);
			}

			return data;
		};
	}
}

module.exports = AuthDirective;
