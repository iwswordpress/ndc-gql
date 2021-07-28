const { authenticated, authorized } = require('./auth');

module.exports = {
	Query: {
		meAuth: authenticated((parent, args, ctx) => {
			console.log('RESOLVERS > meAuth--------------');
			console.log('Query.currentUser.parent', parent);
			console.log('Query.currentUser.args', args);
			console.log('Query.currentUser.ctx', ctx);

			return { id: ctx.user.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
		}),
		meAuth2: authenticated(
			authorized('ADMIN', (parent, args, ctx) => {
				console.log('RESOLVERS > meAuth2--------------');
				console.log('Query.currentUser.parent', parent);
				console.log('Query.currentUser.args', args);
				console.log('Query.currentUser.ctx', ctx);

				return { id: ctx.user.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
			}),
		),
	},
};
