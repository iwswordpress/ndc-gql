## 10-hello-world

This is a base example opening a Playground at port 5000. (ApolloServer defaults to 4000).

It uses Apollo Server.

Used to demonstate the Playground, how a query is a POST and status always 200.

Has client index.html to show how to do client request.

We can show nature of POST as 200 status as well as what is sent via dev tools.

If we have error in GraphQL we still get 200.

Uncomment the getError field in query. It has no associated resovler so GQL will error.

With getError included:

-  The query in playground will error. The playground works for getMessage showing us that GQL does just what is asked but if get is

-  The client will get 200 and errors. GQL sends back two roots - data and errors accordingly.

-  Note how server still works and does not crash.
