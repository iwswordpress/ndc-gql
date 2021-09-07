// Use of Query Tab and HTML 04-get-project-by-id.html request in client folder.
// We can see how ID type is serialized to a string.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
		getProjectById(id: ID!): Project
		getStudentById(id: ID!): Student!
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
		getProjectById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const project = projects.find((project) => project.id == args.id);
			return project;
		},
		getStudentById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const student = students.find((student) => student.id == args.id);
			return student;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server04 running at port ${url}`)));

/*
NB if we have id as query parameter, varaible must be $id not $x. It is not a generic placeholder.


query {
  getProjectById(id: 2){
    id
    name
    completed
  }
}

-- using Query Tab --

query ProjectQuery($id: ID!) { 
  getProjectById(id: $id) {
    id
    name
		completed
  }
}

{
  "id": 1
}

*/
