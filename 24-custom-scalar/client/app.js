const URL = 'http://localhost:5000';

async function fetchMessage(firstName) {
	console.log(firstName);
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
       query Greet($firstName: String!){
				greet(firstName :$firstName )
			}
     `,
			variables: { firstName },
		}),
	});

	const { data } = await response.json();

	return data;
}

fetchMessage('PETER').then((data) => {
	console.log(data);
	document.querySelector('output').textContent = data.greet;
});
