## 25-subscriptions

In server.js

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
