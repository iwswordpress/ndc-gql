## 25-subscriptions

Subscriptions are long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs. Most commonly, updated results are pushed from the server to subscribing clients. For example, a chat application's server might use a subscription to push newly received messages to all clients in a particular chat room.

Because subscription updates are usually pushed by the server (instead of polled by the client), they usually use the WebSocket protocol instead of HTTP.

In server.js

We can see another way to load schemas.

```

apolloServer.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/graphql`));
```

In Schema

```
type Subscription {
	messageAdded: String
}
```

![gql](/_images/25-pub-sub.png)

![gql](/_images/25-subscriptions-resolver.png)

## graphql-yoga version

https://github.com/jherr/chat-o-matic/blob/master/server/server.js - https://www.youtube.com/watch?v=E3NHd-PkLrQ
