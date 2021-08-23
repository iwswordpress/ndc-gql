We can get the query sentas we saw in COURSES-04/15-leaf/index03 by accessing the request object and passing it on in the context:

```
console.log('ctx.body.query', req.body.query);

```

With that we can do a string length check to see if the query is too long for a regular query or do other analysis on the string.

https://www.apollographql.com/blog/graphql/security/9-ways-to-secure-your-graphql-api-security-checklist/

https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html

https://www.youtube.com/watch?v=dBuU61ABEDs&t=1030s - Apollo Summit 2020 JWT

https://lab.wallarm.com/graphql-batching-attack/

https://graphql-shield.vercel.app/docs/rules - article on how to deploy: https://medium.com/@maticzav/graphql-shield-9d1e02520e35

```

```
