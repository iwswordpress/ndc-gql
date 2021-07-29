These are best discovered in playgroun dwith CTRL+space...

https://graphql.org/learn/introspection/

```

query {
  __schema {
    types {
      name
      description
    }
  }
}

{
  __schema {
    queryType {
      kind
      name
      fields{
        name
        description
      }
    }
  }
}

{
  __schema {
    directives {
      __typename
      name
      description
      locations
      args {
        name
        type {
          kind
          name
        }
      }
    }
  }
}


```
