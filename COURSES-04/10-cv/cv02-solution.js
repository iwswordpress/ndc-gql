const { ApolloServer, gql } = require('apollo-server');

const teamMembers = [
	{ id: 101, team: 'FrontEndDev', firstName: 'Sarah', ui: ['css', 'html', 'Vue', 'Svelte'] },
	{ id: 102, team: 'BackEndDev', firstName: 'Dan', db: ['SQL', 'Mongo'] },
	{ id: 103, team: 'BackEndDev', firstName: 'Diana', db: ['SQL', 'Mongo', 'Postgress'] },
	{ id: 104, team: 'FrontEndDev', firstName: 'Henry', ui: ['css', 'html', 'React'] },
];
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
		team: [Person] # new
	}
	enum End { # new
		FrontEndDev
		BackEndDev
	}

	interface Person { # new
		id: ID!
		team: End
		firstName: String
	}

	type FrontEndDev implements Person { # new
		id: ID!
		team: End
		firstName: String
		ui: [String]
	}

	type BackEndDev implements Person { # new
		id: ID!
		team: End
		firstName: String
		db: [String]
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
			return {
				personal: {
					name: 'Craig',
					location: 'Brighton',
				},
				professional: [
					{ skillName: 'PWA', years: 2, level: 'JUNIOR' },
					{ skillName: 'GraphQL', years: 2, level: 'SENIOR' },
				],
				// new
				team: teamMembers,
			};
		},
	},

	Person: {
		__resolveType(person, context, info) {
			// Both methods check for something unique one each interface type and then return the extended type
			// Method One
			// console.log(`__resolving Person type as ---> ${person.team}`);
			// return person.team;
			// ====================
			// Method Two
			if (person.ui) {
				return 'FrontEndDev';
			} else {
				return 'BackEndDev';
			}
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => console.log(`cv02.js running at port ${url}`));
/*
query GetCV {
  getCV(name: "Craig") {
    personal {
      __typename
      name
      location
    }
    professional {
      __typename
      skillName
      years
      level
    }
    team {
      id
      team
      firstName
      ... on FrontEndDev {
        ui
      }
      ... on BackEndDev {
        db
      }
    }
  }
}
*/
