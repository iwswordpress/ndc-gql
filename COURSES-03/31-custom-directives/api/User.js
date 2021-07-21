const users = [
	{
		id: 1,
		token: 'token-for-maurice',
		firstName: 'Maurice',
		lastName: 'Moss',
		email: 'maurice@moss.com',
		password: 'abcdefg',
		role: 'ADMIN',
	},
	{
		id: 2,
		token: 'token-for-roy',
		firstName: 'Roy',
		lastName: 'Trenneman',
		email: 'roy@trenneman.com',
		password: 'imroy',
		role: 'USER',
	},
	{
		id: 2,
		token: 'token-for-jen',
		firstName: 'Jen',
		lastName: 'Barber',
		email: 'jen@barber.com',
		password: 'qwerty',
		role: 'GUEST',
	},
];

module.exports = {
	getUserByToken: (token) => users.find((user) => user.token === token),
};
