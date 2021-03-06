// Use of variables in sub fields.
// We add a Boolean vairable <upper> to Car.brand and if true, the resolver UpperCases it.

const { ApolloServer, gql } = require('apollo-server');
const colors= require('colors')

// create a memory db
const { cars, parts } = require('./data');

// create the schema
const schema = gql`
	enum CarTypes {
		ESTATE
		SUV
		COUPE
	}
	type Car {
		id: ID!
		brand(upper: Boolean): String!
		color: String!
		doors: Int!
		type: CarTypes!
		parts: [Part]
	}
	type Part {
		id: ID!
		name: String
		cars: [Car]
	}

	type Query {
		carsByType(type: CarTypes!): [Car]
		carsById(id: ID!): Car
		partsById(id: ID!): Part
		cars: [Car]
	}
	type Mutation {
		insertCar(brand: String!, color: String!, doors: Int!, type: CarTypes!): [Car]!
	}
`;

// create the resolvers

const resolvers = {
	Query: {
		carsById: (parent, args, context, info) => {
			console.log(args);
			return args;
		},

		// we return a filtered array of cars that then gets its parts resolved
		carsByType: (parent, args, context, info) => {
			console.log('TYPE:', args.type);
			const carsByType = cars.filter((car) => {
				return car.type == args.type;
			});

			return carsByType; // NB we need to send an iterable back as error asking for this will occur
		},
		partsById: (parent, args, context, info) => {
			console.log(args);
			return args;
		},
		cars: (parent, args, context, info) => {
			console.log(parent);
			console.log(args);
			return cars;
		},
	},
	Part: {
		name: (parent, args, context, info) => {
			console.log('Part > name', parent.id);
			if (parts.filter((part) => part.id == parent.id)[0]) {
				return parts.filter((part) => part.id == parent.id)[0].name;
			}
			return null;
		},
		cars: (parent, args, context, info) => {
			console.log('Part > cars', parent.id);
			return parts.filter((part) => part.partId == parent.partId)[0].cars;
		},
	},
	Car: {
		brand: (parent, args, context, info) => {
			console.log('Car > brand', parent.id);
			console.log('Car > brand:upper', args.upper);
			const reqBrand = cars.filter((car) => car.id == parent.id)[0].brand;
			// if we have specified UPPER...
			if (args.upper) {
				return reqBrand.toUpperCase();
			} else {
				return reqBrand.toLowerCase();
			}
		},
		type: (parent, args, context, info) => {
			console.log('Car > type', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].type;
		},
		color: (parent, args, context, info) => {
			console.log('Car > color', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].color;
		},
		doors: (parent, args, context, info) => {
			console.log('Car > doors', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].doors;
		},
		parts: (parent, args, context, info) => {
			console.log('Car > parts', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].parts;
		},
	},
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(colors.cyan.inverse(`???? INDEX02 ready at ${url}`));
});

/*

{
  partsById(id: 1) {
    id
    name
    cars {
      brand(upper:true)
      color
    }
  }
}

*/
