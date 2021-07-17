## TOP

Schema and Resolver modularisation

We use two different methods for local schema merging.

The first in root uses 'extend'.

The second in the mergeSchemas folder uses @graphql-tools/merge - https://www.graphql-tools.com/docs/schema-merging

## SERVER01

This is server06 from COURSES-01

[TOP](#TOP)

## SERVER02

Move resolvers to own folder.

[TOP](#TOP)

## SERVER03

We do schema merging using a simple strategy.

There can only be one root Query.

We can extend type User but we can not have an empty base or extend type, so we use a placeholder \_: String to prevent error.

[TOP](#TOP)

## SERVER04 in mergbeSchemas folder

This is in the mergeSchemas folder.

It does not have resolvers but is an example of how we can use @graphql-tools/merge to merge schemas.

Go into folder and run node server04

[TOP](#TOP)
