const URL = 'http://localhost:5000/graphql';

fetchMessage(101).then((data) => {
	console.log(data.course);
	document.querySelector('output').textContent = data.course.title;
});

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
			variables: { id: x },
		}),
	});

	const { data } = await response.json();

	return data;
}
