// Returning data sets but no sub type resolving.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

// Port variable in .env file
dotEnv.config();

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
	}
	"""
	User details will appear in docs
	"""
	type Student {
		"""
		id comments here
		"""
		id: ID! # general comment
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
			return projects;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server02 running at port ${url}`)));

/*

{
  getAllStudents:students {
    id
    name
    email
  }
  getAllProjects:projects {
    id
    name
    completed
  }
}

*/
