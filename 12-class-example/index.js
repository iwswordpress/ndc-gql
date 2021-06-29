import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.get('/', (req, res) => {
	res.send('I love Graphql');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: resolvers,
		graphiql: true,
	}),
);

app.listen(5000, () => console.log('Running on http://localhost:5000/graphql'));
