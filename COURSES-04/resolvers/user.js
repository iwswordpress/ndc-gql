const { users, projects } = require('../constants');

module.exports = {
	Query: {
		users: () => users,
		user: (_, { id }) => users.find((user) => user.id === id),
	},
	Mutation: {},
	User: {
		projects: ({ id }) => projects.filter((project) => project.userId === id),
	},
};
