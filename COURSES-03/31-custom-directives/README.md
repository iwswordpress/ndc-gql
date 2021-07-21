Inspired by [this blog post](https://jkettmann.com/authorization-with-graphql-and-custom-directives).

## How to install and run the project

Custom header to pass on...

```json
{
	"NDC": "NDC-GQL-2021"
}
```

You can now run following query.

```graphql
{
	currentUser(id: 1) {
		id
		firstName
		role
	}
}
```
