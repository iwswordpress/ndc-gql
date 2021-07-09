const { projects } = require('../data/projects');
const { students } = require('../data/students');

module.exports = {
	Query: {
		projects: () => {
			console.log(projects);
			return projects;
		},
		getProjectById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const project = projects.find((project) => project.id == args.id);
			return project;
		},
	},
	Project: {
		// name: () => {
		// 	console.log(`---> Task.name returning TEST TASK ${Math.floor(Math.random() * 100000 + 100000)}`);
		// 	return `TEST TASK - ${Math.floor(Math.random() * 100000 + 100000)}`;
		// },
	},

	Mutation: {
		_: () => {},
		createProject: (parent, args) => {
			console.log('input', args.input);
			const input = args.input;
			const project = { ...input, id: Math.floor(Math.random() * 10000) };
			projects.push(project);
			return project;
		},
	},
};
