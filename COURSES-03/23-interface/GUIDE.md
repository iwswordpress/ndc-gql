## 23-interface

### We need each type ot have at least one different field so that the Person type can be resolved to Staff or Student...

![gql](../_images/23-interface-query.png)

Union: A collection of related but different objects

Interface: A collection of similar objects with most of their properties the same but some different ones too.

Interfaces allow us to group result into one query.

We have to copy all interface fields in the extended type.

It is not a labour saving method for the SERVER but for the CLIENT.

Furthermore, the definition of the interface might be in another file and would no necessarily know what the interface included.

index-books.js from https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/#interface-type

index01 uses one ENUM.

index02 uses and ENUM that has Interface types - to show how it could be done but is not done.