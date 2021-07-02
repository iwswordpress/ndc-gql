## 00 Course Type

Add Course with Query and Mutation.
We start with Course query and mutation

## 01 Student and Tutor Type

Add Students and Tutors.

We add in Tutor and Student

Use JSON Server to get Queries fulfilled.

## 02 Passing resolution to LEAF

Add Mutations and input Type to schema without resolver. Remove and leave for 3?
Add Course as top level schema type for child resolution.

We know add a way of resolving tutor: Tutor in Course object by adding Job schema as sibling to Query.

When Course gets to resolve tutor and sees it is of type Tutor it needs to find a definition for this in the schema to resolve it to scalar.

Course has a resolver of tutor that returns the details in object for a given tutor. This shows the first argument in resolvers when a child of a parent.

Rember to export all new definitions like this along with Query and Mutation.

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
