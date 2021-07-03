const URL = 'http://localhost:5000/graphql';

const newCourse = {
	title: 'QV',
	tech: 'API',
	tutorId: 1,
};

fetchMessage(newCourse).then((data) => {
	console.log(data);
	document.querySelector('output').textContent = `New Course added with id: ${data.newCourseId} `;
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
				mutation newCourse($input: CreateCourseInput){
  				newCourseId: createCourse(input: $input )
			}
     `,
			variables: { input: newCourse }, 
		}),
	});

	const { data } = await response.json();

	return data;
}
