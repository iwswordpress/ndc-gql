```
{
 tutors: tutors{
    id
    firstName
   lastName
    email
  }
   courses: courses {
    id
    tutorId
    title
    tech
  }
}
query {
  myAlias:tutors {
    id
  }
}
query
  {
    students{
      id
      firstName
      lastName
      email
      age
      courses{
        id
        title
      }
    }
  }


```
