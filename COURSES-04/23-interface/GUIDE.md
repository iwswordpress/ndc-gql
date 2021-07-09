## 23-interface

Interfaces allow us to group result into one query.

We have to copy all interface fields in the extended type.

It is not a labour saving method for the SERVER but for the CLIENT.

Furthermore, the definition of the interface might be in another file and would no necessarily know what the interface included.

It is an appropriate introduction of ENUMs:

````
	enum AllowedColor {
		RED
		GREEN
		BLUE
	}
```

When passing in as values in queries, us RED not 'RED'.

If we execute the query with data, (TEX in this example), that does not follow this constraint then we will get an error:

- "message": "Expected a value of type \"AllowedColor\" but received: \"TEX\"",
GQL wants the schema to be fully self-documenting so we have to copy its fields. In reality, we do this once, but the CLIENT may do this many, many times.

![gql](/_images/23-interface-query.png)

Like UNION, GQL will need to know what type of the interface it is working with.

We carry out the Query for data in the same way but must add:

````

    Animal: {
    	__resolveType(animal, context, info) {
    		console.log(`__resolving Animal type as ---> ${animal.species}`);
    		return animal.species;
    	},
    },

```

It is saying 'The type of animal you are working with is ...'
```
