https://www.apollographql.com/blog/graphql/security/9-ways-to-secure-your-graphql-api-security-checklist/

We use a middleware pattern for authentication and authorization.

We can combine these, create a pipe or compose utility, but for just two functions it is OK to wrap the resolver with a middleware function

```
const middlewareWrapper = (next) => (root, args, context, info) => {
  // create business logic rules
	if (!context.user) {
		throw new AuthenticationError('Please login to use this feature.');
	}
  // proceed on if valid...
	return next(root, args, context, info);
};
```
