const fetch = require('node-fetch');

const Query = {
	courses: async () => {
		const allCourses = await fetch('http://localhost:4010/courses');
		const result = await allCourses.json();
		console.log(`AJAX: http://localhost:4010/courses/`);
		console.log(result);

		return result;
	},
	course: async (root, { id }) => {
		// id = 101;
		const course = await fetch(`http://localhost:4010/courses/${id}`);
		const result = await course.json();
		console.log(`AJAX: http://localhost:4010/courses/${id}`);
		console.log(result);
		return result;
	},
	tutors: async () => {
		const allTutors = await fetch('http://localhost:4010/tutors');
		const result = await allTutors.json();
		console.log(`AJAX: http://localhost:4010/tutors/`);
		console.log(result);

		return result;
	},
	tutor: async (root, { id }) => {
		const tutor = await fetch(`http://localhost:4010/tutors/${id}`);
		const result = await tutor.json();
		console.log(`AJAX: http://localhost:4010/tutors/${id}`);
		console.log(result);
		return result;
	},
	students: async () => {
		const allStudents = await fetch('http://localhost:4010/students');
		const result = await allStudents.json();
		console.log(`AJAX: http://localhost:4010/students/`);
		console.log(result);

		return result;
	},
	student: async (root, { id }) => {
		const student = await fetch(`http://localhost:4010/students/${id}`);
		const result = await student.json();
		console.log(`AJAX: http://localhost:4010/student/${id}`);
		console.log(result);
		return result;
	},
};

// module.exports = { Query };

// Remember to export!
const Course = {
	// course is the parent object
	tutor: (course, args, ctx, info) => {
		console.log('Course parent having Course.tutor resolved', course);
		return { id: '11111', firstName: 'A', lastName: 'Tutor', email: 'x@test.com' };
	},
};

module.exports = { Query, Course };
