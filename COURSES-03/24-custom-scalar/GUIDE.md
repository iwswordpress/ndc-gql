## 24-custom-scalar

https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/

https://www.graphql-tools.com/docs/scalars

These can also be use for validation - https://www.graphql-tools.com/docs/scalars#validations

![gql](../_images/24-custom-scalar.png)

```
 query demoCustomScalar{
   withCustomScalar:getTime
   withString:getTimeString
 }
```

```
Query: {
  getTime: () => new Date(),
  getTimeString: () => new Date(),
  // new Date() will return integer "1625670968724" but our custom scalar converts this to ISO Date
},
```

Note how we can use aliases.
