const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver, GraphQLString } = require('graphql');

class LogDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field, type) {
		const { resolve = defaultFieldResolver } = field; // if we have no resolver on a field like we do with ID
		// console.log('--->', this.field.args);
		const { message: defaultFormat } = this.args;

		field.args.push({
			name: 'message',
			type: GraphQLString,
		});

		field.resolve = async function (root, { message, ...rest }, ctx, info) {
			console.log(`🙂   ${type.objectType}.${field.name} ${message}`);
			return resolve.call(this, root, rest, ctx, info);
		};
	}
}

class FormatDateDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { format: defaultFormat } = this.args;

		field.args.push({
			name: 'format',
			type: GraphQLString,
		});

		field.resolve = async function (root, { format, ...rest }, ctx, info) {
			const date = await resolve.call(this, root, rest, ctx, info);
			return formatDate(date, format || defaultFormat);
		};
	}
}

module.exports = { LogDirective, FormatDateDirective };
