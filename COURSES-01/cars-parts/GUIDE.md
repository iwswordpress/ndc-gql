![gql](cars-parts.png)

![gql](cars-parts-console.png)

When we run carsById, it returns a Car.

The first resolver just gives the args, i.e. id=2 and to resolve Car, it works its way down the graph to Car and finds all the relavant fields.

When it comes to parts, parts returns a list of Part types, so it has to go to Parts and resolve fields there.

If one removes Cars > brand or replaces the return with some other text, it will appear in data returned.

As brand is a required field, if the brand resolver is removed the query will error.

If one makes brand not required, the query will return the default null.

One can keep drilling and lead to a DDOS attack. We will look at how we can prevent this in COURSES-03 > 50-limit-ddos

![gql](ddos.png)
