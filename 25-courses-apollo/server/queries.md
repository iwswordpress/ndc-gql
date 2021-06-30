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
query
  {
    course(id:201){
      id
      title
      tech
      tutorId
    }
  }
{
  courses{
      __typename
    id
    tutor{
        __typename
      id
      firstName
      lastName
      email
    }
  }
}


query CourseQuery($id: ID!){
  course(id:$id) {
    id
    title
  }
}

QV
{
  "id":201
}


```
