# 26-errors

Example in 31-custom-directives

We have throw new Error('Error message to display')

Apollo has many possibilities:

https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors

We can use the formatError().

```
import { ApolloError } from 'apollo-server-errors';

export class MyError extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}

throw new MyError('My error message')

```

```
const server = new ApolloServer({
 typeDefs,
 resolvers,

 formatError: (err) => {
   // Don't give the specific errors to the client.
   if (err.message.startsWith('Database Error: ')) {
     return new Error('Internal server error');
   }
   // Otherwise return the original error. The error can also
   // be manipulated in other ways, as long as it's returned.
   return err;
 },
});

server.listen().then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`);
});

---------
  formatError(err) {
    if (err.originalError instanceof AuthenticationError) {
      return new Error('Different authentication error message!');
    }
  },

```

```
  formatError(err) {
		if (!err.originalError) {
			return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An error occurred.';
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  },
```

### Omitting or including stacktrace

The exception.stacktrace error field is useful while developing and debugging your server, but you probably don't want to expose it to clients in production.

By default, Apollo Server omits the exception.stacktrace field if the NODE_ENV environment variable is set to either production or test.

You can override this default behavior by passing the debug option to the constructor of ApolloServer. If debug is true, exception.stacktrace is always included. If it's false, exception.stacktrace is always omitted.

Note that when exception.stacktrace is omitted, it's also unavailable to your application. To log error stacktraces without including them in responses to clients, see Masking and logging errors here: https://www.apollographql.com/docs/apollo-server/data/errors/#masking-and-logging-errors
