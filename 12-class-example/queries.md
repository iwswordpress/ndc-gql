```
mutation {
   createAPerson(input: {id: 1, firstName: "craig"}) {
     id
     firstName
   }
}
use returned id from mutation
query {
  getPerson(id: "13ef209ca713fdf8fc22"){
    id
    firstName
  }
}
```
