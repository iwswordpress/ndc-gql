const colors = require('colors');

const resolvers = {
	Query: {
		viewUser: (parent, args, ctx) => {
			console.log('RESOLVERS--------------');
			console.log('Query.currentUser.parent', parent);
			console.log('Query.currentUser.args', args);
			console.log('Query.currentUser.ctx', ctx.user);

			return { id: args.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
		},
	},
};

module.exports = resolvers;
