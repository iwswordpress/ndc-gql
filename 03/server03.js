const { ApolloServer } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server03 running at port ${url}`));

/*

query{
  users{
    id
    name
    email
    tasks{
      id
      name
      completed
    }
  }
}

query {
  getUserById(id: 1) {
    id
    name
    email
    tasks {
      id
      name
      completed
    }
  }
}

*/
