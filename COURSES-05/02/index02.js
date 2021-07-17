const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const express = require('express');

class CourseDataAPI extends RESTDataSource {
	async getCourse() {
		const data = await this.get('http://localhost:5000/courseData');
		return data;
	}
}
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
		courseAPI:Course
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
		courseAPI: async (parent, args, context, info) => {
			return await context.dataSources.courseDataAPI.getCourse();
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
				title: title,
				tutorId: tutorId,
				hours: hours,
				tech: tech,
			});
			return db.courses;
		},
	},
};

const dbConnection = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(db);
		}, 2000);
	});
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	dataSources: () => {
		return {
			courseDataAPI: new CourseDataAPI(),
		};
	},
	context: async () => {
		return { db: await dbConnection() };
	},
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
const app = express();
app.get('/courseData', function (req, res) {
	res.send({
		id: Math.random().toString(),
		title: 'A new GraphQL course.',
		tutorId: 1,
		hours: 15,
		tech: 'API',
	});
});

app.listen(3000);

/*
{
  carsAPI{
    brand
    doors
    type
  }
}
*/