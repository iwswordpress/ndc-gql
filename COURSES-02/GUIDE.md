## TOP

Schema and Resolver modularisation

https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

https://www.graphql-tools.com/docs/schema-stitching/#basic-example

![gql](_images/merge-schema.png)

## SERVER01

This is server06 from V1

[TOP](#TOP)

## SERVER02

Move resolvers to own folder.

[TOP](#TOP)

## SERVER03

We do schema stitching/merging using a simple strategy.

For more involved ways with tools:

https://www.graphql-tools.com/docs/schema-merging

There can only be one root Query.

We can extend type User but we can not have an empty base or extend type, so we use a placeholder \_: String to prevent error.
[TOP](#TOP)

## SERVER04

This is in the mergeSchemas folder.

It does not have resolvers but is an example of how we can use @graphql-tools/merge to merge schemas.

Go into folder and run node server04
[TOP](#TOP)
