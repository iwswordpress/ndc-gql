import crypto from 'crypto';
class Person {
	constructor(id, { firstName, lastName, gender, age, email }) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.age = age;
		this.email = email;
	}
}

const personDB = {};
const resolvers = {
	getPerson: ({ id }) => {
		return new Person(id, personDB[id]);
	},
	createAPerson: ({ input }) => {
		let id = crypto.randomBytes(10).toString('hex');
		personDB[id] = input;
		console.log(personDB);
		return new Person(id, input);
	},
};

export default resolvers;
