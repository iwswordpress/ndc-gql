## TOP

[SERVER09](#SERVER09)

## SERVER01

Set up inital test() and view in html page.

See response in NETWORK TAB.

Use getError() to show we still get 200. If there is error on way to API then on emay get 400s etc.

Only one anonymous function per request so use aliases.

CTRL + ENTER in one query will fire that.

```
query two { # two is named query
  result: test # return named result not test
}
```

One can rename tabs which default to query.

Settings:

-  Polling by default every 2 seconds.
-  One can change format etc.

[TOP](#TOP)

## SERVER02

Use of comments and how to insert those comments into docs.

Set up Students and Projects.

Return all projects and students.

Breaks when wanting user sub query.

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
