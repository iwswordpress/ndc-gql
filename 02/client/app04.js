const URL = 'http://localhost:5000';

getTaskById(3).then((data) => {
	console.log(data);
	document.querySelector('output').textContent = data.getTaskById.TaskName;
});
// if id used, need $id, it is not just an empty parameter with any reference.
// replacing $id as $y does not work in client
async function getTaskById(x) {
	// use something other for clarity
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
				query GetTaskById($id: ID!) {
					getTaskById(id: $id) {
						id
						TaskName:name
						completed
					}
				}
     `,
			variables: { id: x }, // x used to keep clarity on ids
		}),
	});

	const { data } = await response.json();

	return data;
}
