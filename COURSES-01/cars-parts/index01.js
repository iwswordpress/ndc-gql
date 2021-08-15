const { ApolloServer, gql } = require('apollo-server');
// create a memory db
const cars = [
	{
		id: 1,
		brand: 'VW',
		color: 'Red',
		doors: 4,
		type: 'ESTATE',
		parts: [{ id: 2 }, { id: 3 }],
	},
	{
		id: 2,
		brand: 'Toyota',
		color: 'Blue',
		doors: 2,
		type: 'COUPE',
		parts: [{ id: 1 }, { id: 3 }],
	},
	{
		id: 3,
		brand: 'Ford',
		color: 'Green',
		doors: 4,
		type: 'SUV',
		parts: [{ id: 1 }, { id: 2 }],
	},
];
const parts = [
	{
		id: 1,
		name: 'Transmission',
		cars: [{ id: 2 }, { id: 2 }],
	},
	{
		id: 2,
		name: 'Suspension',
		cars: [{ id: 1 }],
	},
	{
		id: 3,
		name: 'Brakes',
		cars: [{ id: 1 }, { id: 2 }],
	},
];

// create the schema
const schema = gql`
	enum CarTypes {
		ESTATE
		SUV
		COUPE
	}
	type Car {
		id: ID!
		brand: String # make non required for demo
		color: String
		doors: Int
		type: CarTypes
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
	}
	type Mutation {
		insertCar(brand: String!, color: String!, doors: Int!, type: CarTypes!): [Car]!
	}
`;

// create the resolvers
// const cacheStore = [];
const cacheStore = [{ id: 1, result: 'JSON.stringified' }];

const resolvers = {
	Query: {
		carsById: (parent, args, context, info) => {
			if (cacheStore[0]) {
				console.log('In Memory found...');
			} else {
				console.log('Do API and cache ...');
			}
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
	},
	Part: {
		name: (parent, args, context, info) => {
			console.log('Part > name: parentId', parent.id);
			if (parts.filter((part) => part.id == parent.id)[0]) {
				return parts.filter((part) => part.id == parent.id)[0].name;
			}
			return null;
		},
		cars: (parent, args, context, info) => {
			console.log('Part > cars: parentId', parent.id);
			return parts.filter((part) => part.partId == parent.partId)[0].cars;
		},
	},
	Car: {
		brand: (parent, args, context, info) => {
			console.log('Car > brand: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].brand;
			// return 'CUSTOM BRAND';
		},
		type: (parent, args, context, info) => {
			console.log('Car > type: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].type;
		},
		color: (parent, args, context, info) => {
			console.log('Car > color: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].color;
		},
		doors: (parent, args, context, info) => {
			console.log('Car > doors: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].doors;
		},
		parts: (parent, args, context, info) => {
			console.log('Car > parts: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].parts;
		},
	},
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  INDEX01 ready at ${url}`);
});

/*
# Query.carsById => Cars.brand
# Query.carsById returns args i.e. selected carId which becomes parent for Cars.brand
{
  carsById(id: 1) {
    id
    brand
    color
    doors
    parts {
      id
      name
    }
  }
}

{
  carsByType(type: ESTATE) {
    id
    brand
    color
    doors
    parts {
      id
      name
    }
  }
}

{
  partsById(id: 1) {
    id
    name
    cars {
      brand
      color
    }
  }
}

{
  partsById(id: 2) {
    id
    name
    cars {
      brand
      color
      parts {
        id
        name
        cars{
          id
          doors
        }
      }
    }
  }
}
*/
