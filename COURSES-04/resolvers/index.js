module.exports = {
	Query: {
		users: () => {
			console.log('Query > users and giving typs of users');

			return [
				{
					id: 22,
					role: 'Student',
					firstname: 'Sally',
					year: 22,
				},
				{
					id: 23,
					role: 'Student',
					firstname: 'James',
					year: 25,
				},
				{ id: 33, role: 'Staff', firstname: 'John', dept: 'IT' },
				{ id: 34, role: 'Staff', firstname: 'Peter', dept: 'HR' },
			];
		},
	},

	Person: {
		__resolveType(person, context, info) {
			console.log(`__resolving Person type as ---> ${person.role}`);
			return person.role;
		},
	},
};
