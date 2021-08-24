const { authenticated, authorized } = require('./auth');

module.exports = {
	Query: {
		userAuthenticated: authenticated((parent, args, ctx) => {
			console.log('RESOLVERS > userAuthenticated--------------');
			console.log('Query.currentUser.parent', parent);
			console.log('Query.currentUser.args', args);
			console.log('Query.currentUser.ctx', ctx);

			return { id: ctx.user.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
		}),
		userAuthorized: authenticated(
			authorized('ADMIN', (parent, args, ctx) => {
				console.log('RESOLVERS > userAuthorized--------------');
				console.log('Query.currentUser.parent', parent);
				console.log('Query.currentUser.args', args);
				console.log('Query.currentUser.ctx', ctx);

				return { id: ctx.user.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
			}),
		),
	},
};
