const URL = 'http://localhost:5000';

const output = 'TX-' + Math.floor(Math.random() * 100);
async function fetchMessage(firstName) {
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
       query{
				greet(firstName: "TED" )
			}
     `,
		}),
	});

	const { data } = await response.json();

	return data;
}

fetchMessage().then((data) => {
	console.log(data.greet);
	document.querySelector('output').textContent = data.greet;
});
