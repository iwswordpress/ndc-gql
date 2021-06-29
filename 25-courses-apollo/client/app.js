const URL = 'http://localhost:5000/graphql';

async function fetchMessage(id) {
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
			variables: { id },
		}),
	});

	const { data } = await response.json();

	return data;
}

fetchMessage(301).then((data) => {
	console.log(data.course);
	document.querySelector('output').textContent = data.course.title;
});
