const { ApolloServer, gql } = require('apollo-server');
// create a memory db
const cars = [
	{
		id: 1,
		brand: 'Renault',
		color: 'Red',
		doors: 4,
		type: 'ESTATE',
		parts: [{ id: 1 }, { id: 2 }],
	},
	{
		id: 2,
		brand: 'Toyota',
		color: 'Blue',
		doors: 2,
		type: 'COUPE',
		parts: [{ id: 1 }, { id: 2 }],
	},
	{
		id: 3,
		brand: 'Ford',
		color: 'Green',
		doors: 4,
		type: 'SUV',
		parts: [{ id: 1 }],
	},
];
const parts = [
	{
		id: 1,
		name: 'Transmission',
		cars: [{ id: 1 }, { id: 2 }],
	},
	{
		id: 2,
		name: 'Suspension',
		cars: [{ id: 1 }],
	},
];

// create the schema
const schema = gql(` 
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
		parts:[Part]
	}
	type Part {
		id: ID!
		name(custom: Boolean): String
		cars: [Car]
	}

  type Query {
    carsByType(type:CarTypes!): [Car]
    carsById(id:ID!): Car
    partsById(id:ID!): Part
    cars: [Car]
  }
  type Mutation {
    insertCar(brand: String!, color: String!, doors: Int!, type:CarTypes!): [Car]!
  }
`);

// create the resolvers

const resolvers = {
	Query: {
		carsById: (parent, args, context, info) => {
			console.log(args);
			return args;
		},
		carsByType: (parent, args, context, info) => {
			console.log(args);
			return args;
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
			console.log('Part > name:custom', args.custom);
			if (parts.filter((part) => part.id == parent.id)[0]) {
				if (args.custom) {
					return 'CUSTOM MSG: ' + parts.filter((part) => part.id == parent.id)[0].name;
				} else {
				}
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
	console.log(`🚀  INDEX02 ready at ${url}`);
});
