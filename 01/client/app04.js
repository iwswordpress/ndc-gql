// connect to GraphQL
const URL = 'http://localhost:5000/';

getProjectById(5).then((data) => {
	console.log(data.getProjectById);
	document.querySelector('output').textContent = data.getProjectById.result;
	// we use an alias in query.
});
// if id used, need $id, it is not just an empty parameter with any reference.
// replacing $id as $y does not work in client

async function getProjectById(x) {
	// use something other for clarity
	console.log('x =', x);
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
				query ProjectQuery($id: ID!) {
					getProjectById(id: $id) {
						id
						result:name # we rename field for client
					}
				}
     `,
			variables: { id: x }, // x used to keep clarity on ids. Must use id: $id
			// { "id": 3 } is query variable inplayground. No $
		}),
	});

	const { data } = await response.json();

	return data;
}
