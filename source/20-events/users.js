const express = require('express');
const expressGraphQL = require('express-graphql');
const graphql = require('graphql');
const _db = require('./usersDB');

const events = [];

const schema = graphql.buildSchema(`

		type Person {
			first_name: String
			last_name: String
		}

	  type Event {
			id: ID!
			title: String!
			description: String
			price: Float
			date: String
		}
				
		input EventInput {
			id: ID!
			title: String!
			description: String
			price: Float
			date: String
		}

  type Query {
		events: [Event!]!
  }
	type Mutation {
				createEvent(mutationParameter: EventInput): Event
		}
	schema {
				query: Query
				mutation: Mutation
		}
`);

const rootResolver = {
	events: () => {
		return events;
	},
	createEvent: (args, ctx) => {
		// console.log('CTX', ctx);
		const event = {
			id: args.mutationParameter.id,
			title: args.mutationParameter.title,
			description: args.mutationParameter.description,
			price: +args.mutationParameter.price,
			date: args.mutationParameter.date,
		};
		events.push(event);
		return event;
	},
};

var app = express();
app.use(
	'/graphql',
	expressGraphQL({
		schema: schema,
		rootValue: rootResolver,
		graphiql: true,
	}),
);
app.listen(3000);
console.log('GraphQL server listening at localhost:3000/graphql');
