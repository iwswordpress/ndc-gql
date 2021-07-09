const URL = 'http://localhost:5000/graphql';

fetchMessage(101).then((data) => {
	console.log(data.course);
	document.querySelector('output').textContent = data.course.title;
});
// if id used, need $id, it is not just an empty parameter with any reference.
// replacing $id as $y does not work in client
async function fetchMessage(x) {
	// use something other for clarity
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
					query CourseQuery($id: ID!){
					course(id:$id) { 
						id
						title
					}
				}
     `,
			variables: { id: x }, // x used to keep clarity on ids
		}),
	});

	const { data } = await response.json();

	return data;
}
