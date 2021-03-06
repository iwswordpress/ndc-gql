## 22-union

https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/

![gql](../_images/22-unions.png)

Result = Book | Video

Unions are collections of related objects but with very different schemas.

We may want to do a query across many of these objects, for example search for any Books or Videos that have GraphQL in their title.

Union: A collection of related but different objects

Interface: A collection of similar objects with most of their properties the same but some different ones too.

```

query {
  Books: search(contains: "GraphQL") {
    ... on Book {
      __typename
      bookTitle
      page
      price
    }
  }
  Videos: search(contains: "test") {
    ... on Video {
      __typename
      videoTitle
      length
      isFree
    }
  }
}


```

...on === 'if Book then show...'

Unions are useful when we want to group different types in one query.

Rather than write two queries we can group the search results in one data set.

Initially we set do a query for Result so GQL has to resolve this type. It sees that it contains two types in the Schema but it also has to resolve them.

It looks at the root level for Result and determines from the parent object if it contains authorName or bookTitle as a way of distingushing them.

This is then passed down to Query.search where we can provide the data as appropriate.
