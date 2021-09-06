// Pass resolution all the way down to final fields with colored debugging.
// Use of Fragment in query.
// Use of ENUMS and passing enum input value.
// Demo of using cache value via Car.color which checks local cache and then returns
// EX: comment out cacheStore.push line
// Queries at bottom of file.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

// create a memory db
const { cars, parts } = require('./data');

// create the schema
const schema = gql`
	# These are the queries our clients can execute...
	type Query {
		carsByType(type: CarTypes!): [Car]
		carsById(id: ID!): Car
		partsById(id: ID!): Part
	}
	# We define types...
	enum CarTypes {
		ESTATE
		SUV
		COUPE
	}
	type Car {
		id: ID!
		brand: String # make non required for demo. we will see effect if made required...
		color: String
		doors: Int
		type: CarTypes # must be one of the enum values.
		parts: [Part]
	}
	type Part {
		id: ID!
		name: String
		cars: [Car]
	}

	# note how we do not have to use: schema {query:Query}
`;

// We will use this cacheStore in a bit...
let cacheStore = [];
// cacheStore.push({ id: 1, color: `CACHED VALUE FOR COLOR ${Math.floor(Math.random() * 1000)}` });

// create the resolvers

// When we run the carsById query, we dp not resolve the fields but just return the args.
// GQL knows that there are other resolvers for Car based on the schema so it uses those resolvers
// with the parent parameter passed down. This is the car id.
// Even though it is an INT/ID , the Car type only has ID as required.
// If we comment out Child Resolvers and make one of the other fields required, we will get an error in playground --->  "message": "Cannot return null for non-nullable field Car.doors.",

const resolvers = {
	Query: {
		carsById: (parent, args, context, info) => {
			console.log(colors.yellow('-------------------'));
			console.log(colors.yellow.inverse('carsById:'), args);
			console.log(colors.yellow('-------------------'));
			return args;
		},

		// we return a filtered array of cars that then gets its parts resolved
		carsByType: (parent, args, context, info) => {
			// console.log('TYPE:', args.type);
			const carsByType = cars.filter((car) => {
				return car.type == args.type;
			});

			return carsByType; // NB we need to send an iterable back as error asking for this will occur
		},
		partsById: (parent, args, context, info) => {
			// console.log(args);
			return args;
		},
	},

	// Resolve child types

	Part: {
		name: (parent, args, context, info) => {
			console.log(colors.yellow.italic('Part > name: parentId'), parent.id);
			if (parts.filter((part) => part.id == parent.id)[0]) {
				const Partdotname = parts.filter((part) => part.id == parent.id)[0].name;
				console.log(colors.cyan('Partdotname:'), Partdotname);
				return Partdotname;
			}
			return null;
		},
		cars: (parent, args, context, info) => {
			// console.log('Part > cars: parentId', parent.id);
			return parts.filter((part) => part.partId == parent.partId)[0].cars;
		},
	},
	Car: {
		brand: (parent, args, context, info) => {
			// 	console.log('Car > brand: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].brand;
			// return 'CUSTOM BRAND with parentId: ' + parent.id;
		},
		type: (parent, args, context, info) => {
			// console.log('Car > type: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].type;
		},
		color: (parent, args, context, info) => {
			// console.log('Car > color: parentId', parent.id);
			// This will check to see if we have cacheStore and use that value.
			// Comment out cacheStore.push line and see effect
			if (cacheStore[0]) {
				// console.log(colors.yellow('Using cacheStore for Car.color'));
				return cacheStore[0].color;
			} else {
				return cars.filter((car) => car.id == parent.id)[0].color;
			}
		},
		doors: (parent, args, context, info) => {
			// console.log('Car > doors: parentId', parent.id);
			return cars.filter((car) => car.id == parent.id)[0].doors;
		},
		parts: (parent, args, context, info) => {
			// console.log('Car > parts: parentId', parent.id);
			const data = cars.filter((car) => car.id == parent.id)[0].parts;
			// console.log(colors.yellow('Car.parts'), data);
			return data;
		},
	},

	// Child resolvers
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  INDEX01 ready at ${url}`);
});

/*

# Query.carsById returns args i.e. selected carId which becomes parent for Cars.brand

{
  carsById(id: 1) {
    id
    brand
    color
    doors
    type
    parts {
      id
      name
    }
  }
}

///////////////////
// Fragment Query
{
  carsById(id: 2) {
    id
    ...basics
    type
    parts {
      id
      name
    }
  }
}

fragment basics on Car {
  brand
  color
  doors
}

// Fragment Query
///////////////////

// Using enum as input variable. For carsByType we need to send back an array/iterable.

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
//////////
// DDOS example  - see _images/ddos.png

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
					parts{
						id
						name
						cars{
							id
							brand
						}
					}
        }
      }
    }
  }
}

*/
