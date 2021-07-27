const URL = 'http://localhost:5000/';

async function getCV() {
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
				query Qry{
					getCV(name: "Craig"){
						personal{
							__typename
							name
							location
						}
						professional{
							__typename
							skillName
							years
							level
						}
					}
				}
     `,
		}),
	});

	const { data } = await response.json();

	return data;
}

getCV('PETER').then((data) => {
	console.log('DATA', data);
	console.log('Personal', data.getCV.personal);
	console.log('Professional', data.getCV.professional);
});
