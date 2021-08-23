const URL = 'http://localhost:5000';

async function getUnion() {
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
				query {
					Books: search(contains: "GraphQL") {
						... on Book {
							__typename
							bookTitle
							page
							price
						}
					}
					Videos: search(contains: "test") {
						... on Video {
							__typename
							videoTitle
							length
							isFree
						}
					}
				}
     `,
		}),
	});

	const { data } = await response.json();

	return data;
}

getUnion().then((data) => {
	console.log(data);
});
