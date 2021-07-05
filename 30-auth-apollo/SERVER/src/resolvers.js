const { AuthenticationError } = require('apollo-server');

const { authenticated, authorized } = require('./auth');

/**
 * Anything Query / Mutation resolver
 * using a user for a DB query
 * requires user authenication
 */
module.exports = {
	Query: {
		me: authenticated((_, __, { user }) => {
			return user;
		}),
	
	

	},
	Mutation: {
		createPost: authenticated((_, { input }, { user, models }) => {
			const post = models.Post.createOne({ ...input, author: user.id });
			pubsub.publish(NEW_POST, { newPost: post });
			return post;
		}),

		// admin role
		invite: authenticated(
			authorized('ADMIN', (_, { input }, { user }) => {
				return { from: user.id, role: input.role, createdAt: Date.now(), email: input.email };
			}),
		),

		signup(_, { input }, { user }) {
			console.log('User:', user);
			console.log('input:', input);
			console.log('Welcome...');

			if (user) {
				throw new AuthenticationError('SIGNUP not allowed as you are not registered ');
			}

			return { user: { email: input.email, role: input.role } };
		},
		signin(_, { input }, { user }) {
			if (!user) {
				throw new AuthenticationError('wrong email + password combo');
			}
			return { user };
		},
	},
	User: {
		posts(root, _, { user, models }) {
			if (root.id !== user.id) {
				throw new AuthenticationError('not your posts');
			}

			return models.Post.findMany({ author: root.id });
		},
		settings(root, __, { user, models }) {
			return models.Settings.findOne({ id: root.settings, user: user.id });
		},
	},

	Post: {
		author(post, _, { models }) {
			return models.User.findOne({ id: post.author });
		},
	},
};
