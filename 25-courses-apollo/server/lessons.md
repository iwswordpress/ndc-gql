## 01

We start with Course query and mutation

## 02

We add in Tutor and Student

## 03

We know add a way of resolving tutor: Tutor in Course object by adding Job schema as sibling to Query.

When Course gets to resolve tutor and sees it is of type Tutor it needs to find a definition for this in the schema to resolve it to scalar.

Course has a resolver of tutor that returns the details in object for a given tutor. This shows the first argument in resolvers when a child of a parent.

Rember to export all new definitions like this along with Query and Mutation.
