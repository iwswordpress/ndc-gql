## How to install and run the project

https://www.npmjs.com/package/graphql-custom-directives

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
