const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// bind express with graphql
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	}),
);

app.listen(5000, () => {
	console.log('app.js listening for requests on port http://localhost:5000/graphql');
});
