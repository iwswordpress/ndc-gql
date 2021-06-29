import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Person {
        id: ID
        firstName: String !
        lastName: String
        gender: Gender
        age: Int
        email: String
    }

    enum Gender {
        MALE
        FEMALE
    }
    type Query {
        getPerson(id: ID): Person
    }

    type Mutation{
        createAPerson(input: PersonInput): Person
    }

    input PersonInput{
        id: ID
        firstName: String !
        lastName: String
        gender: Gender
        age: Int
        email: String
    }
`)

export default schema;