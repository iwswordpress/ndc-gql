# 30-auth-apollo

## Authorization and Authentication

Authentication: veryify who the person is.

Authorization: verify the role or access permissions of a user.

Using the Middleware pattern below, we can check for any and all user properties.

```
const authFunction = (next) => (root, args, context, info) => {
	if (!context.user) {
		throw new AuthenticationError('Please login to use this feature.');
	}

	return next(root, args, context, info);
};

```

We can either put several pieces of auth logic in separate funtions or compose them:

authorize('ADMIN', authenticate(resolver)) etc
or have separate multi-logic functions:

-  authenticate
-  authenticate && authorize

There is a library that uses function programming to provide a more functional syntax:

https://github.com/lucasconstantino/graphql-resolvers/

```
cont auth = f(g(x))

const auth = pipe(g(), f())

cont auth = compose(f(), g())
```

```
const isAdmin = combineResolvers(
	isAuthorized('ADMIN'),
	isAuthenticated,
	(root, args, { user: { role } }) => role === 'admin' ? skip : new Error('Notand an authorized admin.')
)
```

This can be of the pipe or compose format.

Unless there is a lot fo auth logic, one or two functions are very manageable.
