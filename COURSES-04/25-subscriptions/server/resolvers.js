const { PubSub } = require('graphql-subscriptions');

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const pubSub = new PubSub();

const Query = {
	messages: (_root, _args, { userId }) => {
		return [{ message: 'Hello World' }];
	},
};

const Mutation = {
	addMessage: (_root, { input }, { userId }) => {
		const msg = `${input} from ctx.usereId: ${userId} ---> ${Math.floor(Math.random() * 20000 + 10000)}`;
		pubSub.publish(MESSAGE_ADDED, { messageAdded: `PUBSUB: ${msg}` }); // need to send payload to clients
		return `MUTATION: ${msg}`; // displays in mutation playground SERVER SIDE
	},
};

const Subscription = {
	messageAdded: {
		subscribe: (_root, _args) => {
			return pubSub.asyncIterator(MESSAGE_ADDED);
		},
	},
};

module.exports = { Query, Mutation, Subscription };
