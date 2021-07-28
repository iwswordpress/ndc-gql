GraphQL middleware library - https://www.youtube.com/watch?v=5ydCPvrWRmg

We will see this in 30-auth-apollo

```
const authenticated = (next) => (root, args, context, info) => {
	if (!context.user) {
		throw new AuthenticationError('Please login to use this feature.');
	}

	return next(root, args, context, info);
};

```

We can then wrap a resolver - we will see this in action in 30-auth-apollo.

```
	Query: {
		meAuth: authenticated((parent, args, ctx) => {
			console.log('RESOLVERS > meAuth--------------');
			console.log('Query.currentUser.parent', parent);
			console.log('Query.currentUser.args', args);
			console.log('Query.currentUser.ctx', ctx);

			return { id: ctx.user.id, firstName: ctx.user.firstName, role: ctx.user.role, token: ctx.user.token };
		}),
	}

```
