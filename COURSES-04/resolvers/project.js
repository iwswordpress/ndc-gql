const uuid = require('uuid');

const { users, projects } = require('../constants');

module.exports = {
	Query: {
		projects: () => {
			return projects;
		},
		project: (_, { id }) => {
			return projects.find((project) => project.id === id);
		},
	},
	Mutation: {
		createProject: (_, { input }) => {
			const project = { ...input, id: uuid.v4() };
			projects.push(project);
			return project;
		},
	},
	Project: {
		user: ({ userId }) => {
			return users.find((user) => user.id === userId);
		},
	},
};
