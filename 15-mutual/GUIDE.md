TLDR;

If we have Schema.Query.cat then this is resolved first.

We can also have Schema.Query.Cat.catName that will then overwrite the Schema.Query.cat.catName.

It is a bit like CSS where last rule trumps others.

Being a Graph, GQL knows all the interconnections.

-  You can either copy and paste index0X into index.js
-  Chagne package.json to use index0x
-  Use node index0x.js

Use to show how resolution passes down

index01 has basic Owner > Cat

![gql](/_images/15-index01.png)

![gql](/_images/15-index01-console.png)

index02 has a CAT type at root of schema that can be used to resolve its fields.
We see the parent argument in action as we can pass down valeus from the cat resolver. Normally an empty object is passed down and we let the top level Cat type resolve all the fields.

![gql](/_images/15-index02.png)

![gql](/_images/15-index02-console.png)
