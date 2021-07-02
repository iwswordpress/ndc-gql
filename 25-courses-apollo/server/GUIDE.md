## Ensure JSON_Server is running to provide database.

## In server.js, use resolver0X and schema0X for each stage.

## 01 Student and Tutor Type

Add Students and Tutors.

We add in Tutor and Student

Use JSON Server to get Queries fulfilled for:

-  student(id)
-  students
-  tutor(id)
-  tutors

How do we handle lists []?

In general, a GraphQL list represents a sequence of values. It is possible to view these values as arrays (e.g. in Javascript), although the analogy is not completely precise. As we mentioned a list keeps items in order. In SDL the list modifier is written as square brackets with the wrapped instance of the type in the bracket. In our schema we used the list modifier to define that if we call the query users, it returns a sequence of types of User from the database.

[Int] A list of nullable integer values
[Int!] A list of non-nullable integer values. Null can be returned but if it contains items they must be Int and not null. Can be empty.
[Int]! A list must be returned but it can have null values
[Int!]! A list must be returned and if there are items then must be Int and cannot be null.

[Int] is informative - the type is meant to be Int
[Int!] means that items are required and must be of type Int.

We can treat the list in the same way.
[] means that a list is meant to be returned but null is OK.
[]! means that a list must be returned otherwise an error will be returned.

![gql](/_images/25-lists.png)

## 02 Passing resolution to LEAF for Course

As it stands, we can get Courses back but no details on Tutor as there is no resolver for it.

```
const Course = {
	// course is the parent object
	tutor: (course, args, ctx, info) => {
		console.log('Course parent having Course.tutpor resolved', course);
		return { id: '11111', firstName: 'A', lastName: 'Tutor', email: 'x@test.com' };
	},
};
```

By adding the above, when GQL sees that on a Course the tutor: Tutor, it can then resolve tutor.

Rember to export all new definitions like this along with Query and Mutation.

EX. Comment out Course in the resolver and remove it as an export and one gets null. With it one gets whatever is in the Course.tutor resolver.

## 03 Course Mutation

Create CourseInput mutation in resolvers.

## 04 ENUMs, Interfaces, Unions and Fragments

Add ENUM, INTERFACE and UNIONS with Fragments

## 05 Subscriptions

Subscriptions

## 06 Authentication

Authentication
Custom directives, HOF, in resolver, complete

## 07 Errors

Errors
