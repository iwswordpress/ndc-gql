const fetch = require('node-fetch');

const Query = {
	courses: async () => {
		const allCourses = await fetch('http://localhost:4010/courses');
		const result = await allCourses.json();
		console.log(result);
		return result;
	},
	course: async (root, { id }) => {
		// id = 101;
		const course = await fetch(`http://localhost:4010/courses/${id}`);
		const result = await course.json();
		console.log(result);
		return result;
	},
};

const Mutation = {};

module.exports = { Query, Mutation };
