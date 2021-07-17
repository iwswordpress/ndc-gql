const { ApolloServer, gql } = require('apollo-server');
// create a memory db
const db = {
	courses: [
		{
			id: 101,
			tutorId: 1,
			title: 'GraphQL',
			tech: 'API',
			hours: 30,
		},
		{
			id: 102,
			tutorId: 2,
			title: 'RxJS',
			tech: 'LANGUAGES',
			hours: 20,
		},
		{
			id: 103,
			tutorId: 2,
			title: 'C#',
			tech: 'LANGUAGES',
			hours: 5,
		},
		{
			id: 104,
			tutorId: 1,
			title: 'AWS',
			tech: 'API',
			hours: 10,
		},
		{
			id: 105,
			tutorId: 2,
			title: 'New Course',
			tech: 'API',
			hours: 25,
		},
	],
};

// create the schema
const schema = gql(` 
enum TechType {
   API
   LANGUAGES
   DB
 }
 type Course {
     id: ID!
     tutorId: String!
     title: String!
     tech: TechType!
     hours: Int!
  }
  type Query {
    courseByTech(tech:TechType!): [Course]
    courseById(id:ID!): Course
  }
  type Mutation {
    insertCourse( tutorId: ID!, title: String!,hours: Int!, tech:TechType!): [Course]!
  }
`);

// create the resolvers

const resolvers = {
	Query: {
		courseByTech: (parent, args, context, info) => {
			console.log(args.tech);
			return db.courses.filter((course) => course.tech === args.tech);
		},
		courseById: (parent, args, context, info) => {
			return db.courses.filter((course) => course.id === args.id)[0];
		},
	},
	Course: {
		title: (parent, args, context, info) => {
			return db.courses.filter((course) => course.title === parent.title)[0].title;
		},
	},
	Mutation: {
		insertCourse: (_, { title, tutorId, hours, tech }) => {
			db.courses.push({
				id: Math.random().toString(),
				title: brand,
				tutorId: tutorId,
				hours: hours,
				tech: tech,
			});
			return db.courses;
		},
	},
};
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
