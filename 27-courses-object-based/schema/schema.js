const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
// dummy data
var courses = [
	{ id: '101', tutorId: '1', name: 'GraphQL', tech: 'API' },
	{ id: '201', tutorId: '2', name: 'RxJS', tech: 'LANGUAGES' },
	{ id: '301', tutorId: '2', name: 'C#', tech: 'LANGUAGES' },
	{ id: '401', tutorId: '1', name: 'AWS', tech: 'API' },
];

var tutors = [
	{ id: '1', name: 'John Doe', age: 44 },
	{ id: '2', name: 'Jane Doe', age: 42 },
];
const CourseType = new GraphQLObjectType({
	name: 'Course',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		tech: { type: GraphQLString },
		tutor: {
			type: TutorType,
			resolve(parent, args) {
				console.log('CourseType > tutor | parent is course', parent);
				return _.find(tutors, { id: parent.id });
			},
		},
	}),
});

const TutorType = new GraphQLObjectType({
	name: 'Tutor',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		courses: {
			type: new GraphQLList(CourseType),
			resolve(parent, args) {
				return _.filter(courses, { tutorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		course: {
			type: CourseType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(courses, { id: args.id });
			},
		},
		tutor: {
			type: TutorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(tutors, { id: args.id });
			},
		},
		courses: {
			type: new GraphQLList(CourseType),
			resolve(parent, args) {
				return courses;
			},
		},
		tutors: {
			type: new GraphQLList(TutorType),
			resolve(parent, args) {
				return tutors;
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addTutor: {
			type: TutorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			resolve(parent, args) {
				let tutor = new tutor({
					name: args.name,
					age: args.age,
				});
				return tutor.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
