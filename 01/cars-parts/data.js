const cars = [
	{
		id: 1,
		brand: 'VW',
		color: 'Red',
		doors: 4,
		type: 'ESTATE',
		parts: [{ id: 2 }, { id: 3 }],
	},
	{
		id: 2,
		brand: 'Toyota',
		color: 'Blue',
		doors: 2,
		type: 'COUPE',
		parts: [{ id: 1 }, { id: 3 }],
	},
	{
		id: 3,
		brand: 'Ford',
		color: 'Green',
		doors: 4,
		type: 'SUV',
		parts: [{ id: 1 }, { id: 2 }, { id: 3 }],
	},
];
const parts = [
	{
		id: 1,
		name: 'Transmission',
		cars: [{ id: 2 }, { id: 3 }],
	},
	{
		id: 2,
		name: 'Suspension',
		cars: [{ id: 1 }, { id: 3 }],
	},
	{
		id: 3,
		name: 'Brakes',
		cars: [{ id: 1 }, { id: 2 }, { id: 3 }],
	},
];

module.exports = { cars, parts };
