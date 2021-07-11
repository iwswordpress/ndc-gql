/* A batch loading function accepts an array of keys, 
and returns a promise which resolves to an array of values. */

/* DataLoader will coalesce all individual loads 
which occur within a single tick of an event loop 
and then call your batch loading function */

const DataLoader = require('dataloader');

const batchUsers = async (ids) => {
	console.log('batchuser called ---> ', ids);
	return ids;
};

const batchUserLoader = new DataLoader((keys) => batchUsers(keys));
console.log('START INIT', Date.now());
batchUserLoader.load(1);
batchUserLoader.load(2);
batchUserLoader.load(1);
batchUserLoader.load(1);

batchUserLoader.load(1);
batchUserLoader.load(3);
batchUserLoader.load(9);
batchUserLoader.load(10);
console.log('END INIT', Date.now());

// Force next-tick
setTimeout(() => {
	console.log('==================================');
	console.log('START TIMEOUT 1', Date.now());
	batchUserLoader.load(3);
	batchUserLoader.load(4);
	batchUserLoader.load(5);
	batchUserLoader.load(6);
	console.log('END TIMEOUT 1', Date.now());
}, 100);

// Force next-tick
setTimeout(() => {
	console.log('==================================');
	console.log('START TIMEOUT 2', Date.now());
	batchUserLoader.load(1);
	batchUserLoader.load(2);
	batchUserLoader.load(3);
	batchUserLoader.load(4);
	batchUserLoader.load(5);
	batchUserLoader.load(6);
	batchUserLoader.load(7);
	batchUserLoader.load(8);
	batchUserLoader.load(9);
	batchUserLoader.load(10);
	batchUserLoader.load(11);
	batchUserLoader.load(12);
	batchUserLoader.load(13);
	batchUserLoader.load(14);
	batchUserLoader.load(15);
	console.log('END TIMEOUT 2', Date.now());
}, 200);
