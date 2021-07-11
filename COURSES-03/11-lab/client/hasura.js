const URL = 'https://iwswordpress.hasura.app/v1/graphql';

async function fetchMessage() {
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
        query MyQuery {
            test{
              course_date
              course_title
              id
            }
    }
     `,
		}),
	});

	const { data } = await response.json();

	return data;
}

fetchMessage().then((data) => {
	console.log(data);
	// /document.querySelector('output').textContent = data.greet;
});
