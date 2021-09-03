```

query {
  __schema {
    types {
      name
      description
    }
  }
}

query myQuery {
  __type(name:"testName"){
    name {
      fields {
        name
        description
      }
    }
  }
}

query  roots {
  __schema {
    queryType {
      ...typeFields
    }
    mutationType {
          ...typeFields
        }
     subscriptionType {
      ...typeFields
    }

  }

  fragment typeFields on __Type {
    name
    fields {
      name
    }
  }
}

```
