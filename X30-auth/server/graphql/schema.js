const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type User {
        id: ID!
        firstName: String!
        email: String!
        password: String
        token: String
        status: String
    }

    type AuthData {
        token: String!
        userId: String!
    }

    

    input UserInputData {
        email: String!
        firstName: String!
        password: String!
    }


    type RootQuery {
        login(email: String!, password: String!): AuthData!
     
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
       
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
