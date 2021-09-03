const DataLoader = require('dataloader');
const colors = require('colors');
const fakeBooksDB = [
	{ title: 'book 1', author_id: 1 },
	{ title: 'book 2', author_id: 2 },
	{ title: 'book 3', author_id: 3 },
	{ title: 'book 4', author_id: 1 },
	{ title: 'book 5', author_id: 1 },
	{ title: 'book 6', author_id: 1 },
	{ title: 'book 7', author_id: 2 },
	{ title: 'book 8', author_id: 3 },
	{ title: 'book 10', author_id: 3 },
	{ title: 'book 11', author_id: 3 },
	{ title: 'book 12', author_id: 3 },
	{ title: 'book 13', author_id: 3 },
	{ title: 'book 14', author_id: 3 },
	{ title: 'book 15', author_id: 3 },
	{ title: 'book 16', author_id: 2 },
	{ title: 'book 17', author_id: 2 },
];
const batchGetBooksById = async (ids) => {
	const books = ids.map((authorId) => {
		return fakeBooksDB.filter((book) => book.author_id === authorId);
	});
	console.log(colors.green.inverse('batchGetBooksById'));
	console.log(colors.yellow.bold('I only get fired once'));
	return books;
};
const bookLoader = new DataLoader(batchGetBooksById);
// loop simulates 3 author parent resolvers,
for (let i = 1; i <= 3; i++) {
	bookLoader.load(i).then((res) => {
		console.log(colors.blue.inverse(`\nAuthor #${i} books:`));
		console.log(res);
	});
}

// https://medium.com/the-marcy-lab-school/how-to-use-dataloader-js-9727c527efd0
