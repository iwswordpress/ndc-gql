const fs = require('fs'); // to read in the graphql file but other options to do this.

const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver, GraphQLString } = require('graphql');
const cors = require('cors'); // we will use localhost on a different port
const express = require('express');

const app = express();
app.use(cors(), express.json());

// Demo CONTEXT
const user = {
	role: 'MEMBER',
	id: 100,
};
const typeDefs = gql(fs.readFileSync('./schemas/schema05.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers/resolvers05');
const context = user;

class LogDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field, type) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async function (root, args, ctx, info) {
			console.log(`⚡️  ${type.objectType}.${field.name} `);
			return resolve.call(this, root, rest, ctx, info);
		};
	}
}

class FormatDateDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { format: defaultFormat } = this.args;

		field.args.push({
			name: 'format',
			type: GraphQLString,
		});

		field.resolve = async function (root, { format, ...rest }, ctx, info) {
			const date = await resolve.call(this, root, rest, ctx, info);
			return formatDate(date, format || defaultFormat);
		};
	}
}
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	schemaDirectives: {
		log: LogDirective,
		formatDate: FormatDateDirective,
	},
});
// route for graphiql
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	// do authentication
	res.send({ email, token: 'VALID' });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.info(`Server started on http://localhost:${PORT}/graphql`);
	console.log('START JSON SERVER dev:courses!');
	console.log('CUSTOM DIRECTIVES');
});
