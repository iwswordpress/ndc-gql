## 11-greet

Uses argument.

Note double quotes and argument needs to be the same as specified in Schema.

Returns scalar type so no need for sub fields.

```
{
  greet(firstName:"Craig")
}
```

We can also use variables in GQL and client:

```
query Greet($firstName: String!) {
  greet(firstName: $firstName)
}
```

We pass in the variable in the QUERY VARIABLES tab a bottom:

```
{
  "firstName": "John"
}
```

NB no $ and " around key and value unless Int.

![gql](/_images/11-gql.png)

### Client

In client we add a variables property in the body:

```
	body: JSON.stringify({
			query: `
       query Greet($firstName: String!){
				greet(firstName :$firstName )
			}
     `,
			variables: { firstName },
		}),
```

![gql](/_images/11-client-variable.png)

```

```
