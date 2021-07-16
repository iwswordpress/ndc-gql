## TOP

## SERVER01

-  Send back null for hello and it works.
-  Remove all resolvers and it works.
-  test(x: Int) has optional argument. use test(x: Int!) and see difference with no argument
-  See response in NETWORK TAB - always 200 unless client side error.
-  Use getError() to show we still get 200. If there is error on way to API then on emay get 400s etc.
-  CTRL + ENTER in one query will fire that...or else play button will show two queries...

```
query MyName {
  result: test(x: 22)
}
query MyName2 {
  result: test(x: 22)
}
```

-  One can change shape of returned data with aliases at field level:

```
query {
  me {
    id
    skills: stack
  }
}
```

![gql](/_images/null-list.png)

-  Difference of lists and ! with data...['a','b', null], null, []etc
-  use of Me return type and how that works.
-  'api' shows how we can use GraphQL as wrapper around our API. (In Auth we will see how we can pass on headers to API to do Auth).

## Settings:

-  One can rename tabs which default to query.
-  Polling by default every 2 seconds.
-  One can change format etc.

## Introspection

-  See introspection.md for queries. GraphQL designed to be self-explaining.

## Client HTML example

-  We will see this later

[TOP](#TOP)

## SERVER02

Use of comments and how to insert those comments into docs.

Set up Students and Projects.

Return all projects and students.

Breaks when wanting user sub query. We need to have a foreigh key type appraach. Note we could resolve all the data in the resolver but that would cause overfetching when the query does not ask for user details rather. It is best to let each field and type do their own resolving.

[TOP](#TOP)

## SERVER03

We can overwrite project.name with a resolver for name

[TOP](#TOP)

## SERVER04

getProjectById query

```
{
  getProjectById(id: 1) {
    id
    name
    completed

  }
}

```

Same for students. If one has a function in Schema.Query but not defined in resolves the app won't crash until that function is called.

ids are serialized to string type.

[TOP](#TOP)

## SERVER05

Add createProject Mutation and create type input.

New project store in memory not file.

Add mutation: Mutation to schema.

Use Query Variables tab.

In client HTML, the alias ProjectCreated is used.

![gql](/_images/06-query-variables-tab.png)

_06-add-task.html has client version._

[TOP](#TOP)

[TOP](#TOP)

## SERVER07

## SERVER08

## SERVER09

[TOP](#TOP)
