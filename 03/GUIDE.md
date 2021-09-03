## TOP

[SERVER09](#SERVER09)

## SERVER01

Base version

[TOP](#TOP)

## SERVER02

Move resolvers to own folder.

[TOP](#TOP)

## SERVER03

We do schema stitching.

There can only be one root Query.

We can extend type User but we can not have an empty base or extend type, so we use a placeholder \_: String to prevent error.
[TOP](#TOP)

## TEMPLATE-LITERALS

As gql use template literals we can use template variables in the gql template literal to put parts of the schema in variables that can be imported from other files.

## MERGE SCHEMAS

This is taken from graphql-tools docs - https://www.graphql-tools.com/docs/schema-merging#merging-type-definitions
