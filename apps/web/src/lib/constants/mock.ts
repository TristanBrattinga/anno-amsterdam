import type { Building } from '$types';

export const BUILDINGS_MOCK: Building[] = [
	{
		_id: 'id1',
		location: { type: 'Point', coordinates: [52.37883521144042, 4.874603183381912] },
		name: "Pieter's huis",
		address: 'Rombout Hogerbeetsstraat 1',
		construction_year: 2021,
		type_of_user: 'Type 1',
		tags: ['tag1', 'tag2'],
		description: 'Description 1',
		image_urls: [
			{
				url: 'https://i.pinimg.com/originals/cf/04/0c/cf040ca676652e27cf5f7478049d8037.jpg',
				source: 'source1',
				year: 2021,
				is_main: true
			}
		],
		timeline: [],
		active: true,
		audioguids: [],
		created_at: '2021-01-01T00:00:00.000Z',
		updated_at: '2021-01-01T00:00:00.000Z'
	},
	{
		_id: 'id2',
		location: { type: 'Point', coordinates: [0, 0] },
		name: 'Building 2',
		address: 'Address 2',
		construction_year: 2022,
		type_of_user: 'Type 2',
		tags: ['tag3', 'tag4'],
		description: 'Description 2',
		image_urls: [
			{
				url: 'https://geheugenvanwest.amsterdam/image/2016/9/21/rombout_1.jpg(mediaclass-facebook-og.75476a0dc140accd5c88a86489d839cda0813029).jpg',
				source: 'source2',
				year: 2022,
				is_main: true
			}
		],
		timeline: [],
		active: true,
		audioguids: [],
		created_at: '2022-01-01T00:00:00.000Z',
		updated_at: '2022-01-01T00:00:00.000Z'
	}
];
