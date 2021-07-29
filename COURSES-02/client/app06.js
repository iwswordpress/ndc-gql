const URL = 'http://localhost:5000/graphql';

const newTask = {
	name: 'TASK ' + Math.floor(Math.random() * 10),
	completed: false,
	userId: 1,
};

addTask(newTask).then((data) => {
	console.log(data);
	document.querySelector(
		'output',
	).innerHTML = `<b>${data.TaskCreated.name}</b> added with id: <b>${data.TaskCreated.id}</b> `;
});
// if id used, need $id, it is not just an empty parameter with any reference.
// replacing $id as $y does not work in client
async function addTask(newCourse) {
	// use something other for clarity
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			query: `
			mutation AddTask($input: CreateTaskInput!){
				TaskCreated: createTask(input:$input){
					id
					name	
					completed
				}
			}
     `,
			variables: { input: newTask },
		}),
	});

	const { data } = await response.json();

	return data;
}
