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
