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
		search: (_, args) => {
			// From data response
			const bookTitle = args.contains + ' ' + Math.floor(Math.random() * 100) + ' - title of book';
			const authorName = args.contains + ' ' + Math.floor(Math.random() * 100) + ' - name of author';

			const data = [{ bookTitle }, { authorName }];

			return data;
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
	Result: {
		__resolveType(obj, context, info) {
			if (obj.authorName) {
				return 'Author';
			}

			if (obj.bookTitle) {
				return 'Book';
			}

			return null;
		},
	},
};
