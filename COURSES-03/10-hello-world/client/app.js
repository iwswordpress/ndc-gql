const URL = 'http://localhost:5000';

async function fetchMessage() {
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
       query {
        getMessage
      }

     `,
		}),
	});

	// Add getError below getMessage to show how GQL errors are sent back to client.

	const { data } = await response.json();

	return data;
}

fetchMessage().then((data) => {
	console.log(data.getMessage);
	document.querySelector('output').textContent = data.getMessage;
});
