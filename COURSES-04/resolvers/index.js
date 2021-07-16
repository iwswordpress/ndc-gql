module.exports = {
	Query: {
		users: () => {
			console.log('Query > users and giving typs of users');

			return [
				{
					id: 22,
					role: 'Student',
					firstName: 'Sarah-Jane',
					year: 22,
					gradStatus: 'GRAD',
				},
				{
					id: 23,
					role: 'Student',
					firstName: 'James',
					year: 25,
					gradStatus: 'UNDERGRAD',
				},
				{
					id: 24,
					role: 'Student',
					firstName: 'Allie',
					year: 27,
					gradStatus: 'POSTGRAD',
				},
				{ id: 33, role: 'Staff', firstName: 'John', dept: 'IT' },
				{ id: 34, role: 'Staff', firstName: 'Petra', dept: 'HR' },
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
