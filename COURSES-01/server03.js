const { ApolloServer, gql } = require('apollo-server');
const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
	}

	type Student {
		id: ID!
		name: String!
		email: String!
		projects: [Project!]
	}

	type Project {
		id: ID!
		name: String!
		completed: Boolean!
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		students: () => {
			return students;
		},
		projects: () => {
			console.log(projects);
			return projects;
		},
	},
	// Project: {
	// 	name: () => {
	// 		console.log(`---> Project.name returning TEST Project ${Math.floor(Math.random() * 100000 + 100000)}`);
	// 		return `TEST Project - ${Math.floor(Math.random() * 100000 + 100000)}`;
	// 	},
	// },

	// EX do same for Student but return uppercase name
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));

// {
//   projects{
//     id
//     name
//     completed
//     user{
//       id
//       name
//       email
//     }
//   }
// }
