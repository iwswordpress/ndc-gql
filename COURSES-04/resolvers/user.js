const { users, projects } = require('../constants');

module.exports = {
	Query: {
		users: () => users,
		user: (_, { id }) => users.find((user) => user.id === id),
		animals: () => {
			console.log('Query > animals and giving typs of species');

			return [
				{
					species: 'Tiger',
					stripeCount: 22,
				},
				{ species: 'Lion', color: 'RED' },
			];
		},
	},
	Mutation: {},
	User: {
		projects: ({ id }) => projects.filter((project) => project.userId === id),
	},
	Animal: {
		__resolveType(animal, context, info) {
			console.log(`__resolving Animal type as ---> ${animal.species}`);
			return animal.species;
		},
	},
};
