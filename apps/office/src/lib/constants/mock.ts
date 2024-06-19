import type { Building } from '$types'

export const BUILDINGS_MOCK: Building[] = [
	{
		"id": 1,
		"location": {
			"type": "Point",
			"coordinates": [
				52.37883521144042,
				4.874603183381912
			]
		},
		"name": "Pieter's huis",
		"address": "Rombout Hogerbeetsstraat 1",
		"construction_year": 1600,
		"type_of_user": "Woning",
		"tags": [
			"Hendrick de Keyser",
			"Stepped gable",
			"Amsterdam Renaissance",
			"Scrollwork"
		],
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"image_urls": [
			{
				"url": "https://i.pinimg.com/originals/cf/04/0c/cf040ca676652e27cf5f7478049d8037.jpg",
				"source": "source1",
				"year": 1600,
				"is_main": true
			}
		],
		"timeline": [],
		"active": true,
		"audioguids": [],
		"created_at": "2021-01-01T00:00:00.000Z",
		"updated_at": "2021-01-01T00:00:00.000Z"
	},
	{
		"id": 2,
		"location": {
			"type": "Point",
			"coordinates": [
				52.35941317456723,
				4.907809735495526
			]
		},
		"name": "Theo Thijssenhuis",
		"address": "Amstelcampus Wibautstraat 2 TTH",
		"construction_year": 2000,
		"type_of_user": "School",
		"tags": [
			"tag3",
			"tag4"
		],
		"description": "Description 2",
		"image_urls": [
			{
				"url": "https://geheugenvanwest.amsterdam/image/2016/9/21/rombout_1.jpg(mediaclass-facebook-og.75476a0dc140accd5c88a86489d839cda0813029).jpg",
				"source": "source2",
				"year": 2000,
				"is_main": true
			}
		],
		"timeline": [],
		"active": true,
		"audioguids": [],
		"created_at": "2022-01-01T00:00:00.000Z",
		"updated_at": "2022-01-01T00:00:00.000Z"
	}
]
