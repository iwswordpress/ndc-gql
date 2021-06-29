const _db = {
	users: [
		{
			id: 1,
			uid: '95dac431-ab2a-4707-875a-561a0f186857',
			password: 'e59rkU0cyV',
			first_name: 'Kit',
			last_name: 'Bruen',
			username: 'kit.bruen',
			email: 'kit.bruen@email.com',
			avatar: 'https://robohash.org/laborenihilomnis.png?size=300x300&set=set1',
			gender: 'Bigender',
			phone_number: '+1-264 (254) 132-9834 x17947',
			social_insurance_number: '660060906',
			date_of_birth: '1970-10-12',
			employment: {
				title: 'Technology Architect',
				key_skill: 'Communication',
			},
			address: {
				city: 'Port Eneidafort',
				street_name: 'Samuel Plaza',
				street_address: '3963 Vasiliki Mountains',
				zip_code: '77391',
				state: 'Indiana',
				country: 'United States',
				coordinates: {
					lat: -42.54851272287582,
					lng: 174.04194912417148,
				},
			},
			credit_card: {
				cc_number: '4743-3391-1673-1791',
			},
			subscription: {
				plan: 'Premium',
				status: 'Blocked',
				payment_method: 'Cheque',
				term: 'Annual',
			},
		},
		{
			id: 2,
			uid: 'c05f9e89-0798-430c-8841-b06ba5ffed2e',
			password: 'KH6B8nP59r',
			first_name: 'Mercedez',
			last_name: 'Buckridge',
			username: 'mercedez.buckridge',
			email: 'mercedez.buckridge@email.com',
			avatar: 'https://robohash.org/eumeaeum.png?size=300x300&set=set1',
			gender: 'Agender',
			phone_number: '+594 631-206-6864 x480',
			social_insurance_number: '121003016',
			date_of_birth: '1985-04-15',
			employment: {
				title: 'Future Marketing Facilitator',
				key_skill: 'Confidence',
			},
			address: {
				city: 'North Dalia',
				street_name: 'Simonis Brooks',
				street_address: '9625 Mante Shoals',
				zip_code: '48666-9638',
				state: 'New Mexico',
				country: 'United States',
				coordinates: {
					lat: 44.17269033680196,
					lng: -114.62516473626505,
				},
			},
			credit_card: {
				cc_number: '4212704245858',
			},
			subscription: {
				plan: 'Starter',
				status: 'Idle',
				payment_method: 'Cash',
				term: 'Monthly',
			},
		},
	],

	posts: [
		{
			user_id: 1,
			text: 'Hello World! This is my first post.',
		},
	],
};
module.exports = _db;
