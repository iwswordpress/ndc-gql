const { projects } = require('../data/projects');
const { students } = require('../data/students');

module.exports = {
	Query: {
		students: () => {
			return students;
		},

		getStudentById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const student = students.find((student) => student.id == args.id);
			return student;
		},
	},
	Mutation: {
		_: String,
	},
	Student: {
		projects: (parent) => {
			console.log('In Student.projects');
			console.log('Student.Projects > parent.userId', parent.id);
			const allProjects = projects.filter((project) => project.userId === parent.id);

			return allProjects;
		},
	},
};
