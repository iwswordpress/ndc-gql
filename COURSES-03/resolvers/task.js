const { users } = require('../data/users');
const { tasks } = require('../data/tasks');

module.exports = {
	Query: {
		tasks: () => {
			console.log(tasks);
			return tasks;
		},
		getTaskById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const task = tasks.find((task) => task.id == args.id);
			return task;
		},
	},
	Task: {
		user: (parent) => {
			// we can destucture but left in for teaching purposes
			console.log('In Task.user');
			console.log('Task.user > parent.userId', parent.userId);
			const user = users.find((user) => user.id === parent.userId);
			console.log('user is', user);
			return user;
		},
		// name: () => {
		// 	console.log(`---> Task.name returning TEST TASK ${Math.floor(Math.random() * 100000 + 100000)}`);
		// 	return `TEST TASK - ${Math.floor(Math.random() * 100000 + 100000)}`;
		// },
	},

	Mutation: {
		createTask: (parent, args) => {
			console.log('input', args.input);
			const input = args.input;
			const task = { ...input, id: Math.floor(Math.random() * 10000) };
			tasks.push(task);
			return task;
		},
	},
};
