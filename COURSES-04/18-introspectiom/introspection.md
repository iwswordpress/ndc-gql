These are best discovered in playground with CTRL+space...

https://graphql.org/learn/introspection/

https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/

```
# turn off introspection in production
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
});

# turn off playground
const { ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageDisabled()
  ]
});

or customise using plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
      // By default, GraphQL Playground connects to a GraphQL server hosted at the same URL as Playground itself. /// To specify a different GraphQL endpoint, use this option.
    })
  ]

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
