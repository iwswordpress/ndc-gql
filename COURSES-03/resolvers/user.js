const { users } = require('../data/users');
const { tasks } = require('../data/tasks');

module.exports = {
	Query: {
		users: () => {
			return users;
		},

		getUserById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const user = users.find((user) => user.id == args.id);
			return user;
		},
	},

	User: {
		tasks: (parent) => {
			console.log('In User.user');
			console.log('User.tasks > parent.userId', parent.id);
			const allTasks = tasks.filter((task) => task.userId === parent.id);

			return allTasks;
		},
	},
};
