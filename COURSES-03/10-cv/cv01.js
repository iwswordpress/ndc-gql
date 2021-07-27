const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		getCV(name: String!): CV!
	}

	type Me {
		name: String
		location: String
	}

	enum LEVEL {
		JUNIOR
		SENIOR
		EXPERT
	}
	type Skill {
		skillName: String
		years: Int
		level: LEVEL
	}

	type CV {
		personal: Me
		professional: [Skill]
	}
	# schema is included by default but shows why query is a reserved word in playground
	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		getCV: (parent, args, context, info) => {
			console.log(`CV for ${args.name}`);
			const myName = 'My name is ' + args.name;

			return {
				personal: {
					name: myName,
					location: 'Brighton',
				},
				professional: [
					{ skillName: 'PWA', years: 2, level: 'JUNIOR' },
					{ skillName: 'GraphQL', years: 2, level: 'SENIOR' },
				],
			};
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => console.log(`cv01.js running at port ${url}`));
/*
query GetCV{
  getCV(name: "Craig"){
    personal{
      __typename
      name
      location
    }
    professional{
      __typename
      skillName
      years
      level
    }
  }
}
*/
