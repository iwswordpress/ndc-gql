https://github.com/tc39/proposal-decorators

https://www.apollographql.com/docs/apollo-server/v2/schema/creating-directives/

Apollo says:

'What about query directives?

Although directive syntax can also appear in GraphQL queries sent from the client, implementing query directives requires runtime transformation of query documents. We have deliberately restricted this implementation to transformations that take place at server construction time.

We believe confining this logic to your schema is more sustainable than burdening your clients with it, though you can probably imagine a similar sort of abstraction for implementing query directives. If that possibility becomes a need for you, let us know.What about query directives?
Although directive syntax can also appear in GraphQL queries sent from the client, implementing query directives requires runtime transformation of query documents. We have deliberately restricted this implementation to transformations that take place at server construction time.

We believe confining this logic to your schema is more sustainable than burdening your clients with it, though you can probably imagine a similar sort of abstraction for implementing query directives. If that possibility becomes a need for you, let us know.'

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
