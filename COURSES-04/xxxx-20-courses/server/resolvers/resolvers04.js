const fetch = require('node-fetch');
const JSON_URL = 'http://localhost:4010';
const Query = {
	courses: async () => {
		const allCourses = await fetch(`${JSON_URL}/courses`);
		const result = await allCourses.json();
		console.log(`AJAX: ${JSON_URL}/courses/`);
		console.log(result);

		return result;
	},
	course: async (root, { id }) => {
		// id = 101;
		const course = await fetch(`${JSON_URL}/courses/${id}`);
		const result = await course.json();
		console.log(`AJAX: http://localhost:4010/courses/${id}`);
		console.log(result);
		return result;
	},
	tutors: async () => {
		const allTutors = await fetch(`${JSON_URL}/tutors`);
		const result = await allTutors.json();
		console.log(`AJAX:http://localhost:4010/tutors/`);
		console.log(result);

		return result;
	},
	tutor: async (root, { id }) => {
		const tutor = await fetch(`${JSON_URL}/tutors/${id}`);
		const result = await tutor.json();
		console.log(`AJAX: http://localhost:4010/tutors/${id}`);
		console.log(result);
		return result;
	},
	students: async () => {
		const allStudents = await fetch(`${JSON_URL}/students`);
		const result = await allStudents.json();
		console.log(`AJAX: http://localhost:4010/students/`);
		console.log(result);

		return result;
	},
	student: async (root, { id }) => {
		const student = await fetch(`${JSON_URL}/students/${id}`);
		const result = await student.json();
		console.log(`AJAX: http://localhost:4010/student/${id}`);
		console.log(result);
		return result;
	},
};

// Remember to export!
const Course = {
	// course is the parent object
	tutor: (course, args, ctx, info) => {
		console.log(`Course parent having tutor:Tutor resolved`, course);
		return { id: '11111', firstName: 'A', lastName: 'Tutor', email: 'x@test.com' };
	},
};

const Mutation = {
	createCourse: (parent, args, ctx, info) => {
		console.log('Parent: ', parent);
		console.log('Args: ', args);
		console.log('Ctx: ', ctx.id, ctx.role);
		const id = Math.floor(Math.random() * 10000 + 1000);
		const newCourse = {
			id: id,
			title: args.title,
			tech: args.tech,
			tutorId: args.tutorId,
		};
		return id;
	},
};

module.exports = { Query, Mutation, Course };
