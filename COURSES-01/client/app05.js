const URL = 'http://localhost:5000/graphql';

const newProject = {
	name: 'NEW PROJECT',
	completed: false,
};

fetchMessage(newProject).then((data) => {
	console.log(data);
	document.querySelector('output').innerHTML = `New Course added with id: <b>${data.ProjectCreated.id}</b> `;
});
// if id used, need $id, it is not just an empty parameter with any reference.
// replacing $id as $y does not work in client
async function fetchMessage(newCourse) {
	// use something other for clarity
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
				mutation CreateProject($input: CreateProjectInput) {
					ProjectCreated: createProject(input: $input) {
						id
						name
						completed
					}
				}

     `,
			variables: { input: newProject },
		}),
	});

	const { data } = await response.json();

	return data;
}
