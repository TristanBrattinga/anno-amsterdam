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
	},
	{
		"id": 3,
		"bag_id": "0363200000261101",
		"location": {
			"type": "Point",
			"coordinates": [
				4.8963774,
				52.3678032
			]
		},
		"name": "'s-Gravelandse Veer",
		"address": "'s-Gravelandse Veer 2",
		"construction_year": 1711,
		"type_of_use": "bijeenkomstfunctie",
		"tags": "tag12 tags",
		"description": "\t\t\t\t\t",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"updated_at": "2024-06-08T12:35:34.928Z"
	},
	{
		"id": 4,
		"bag_id": "0363200012132164",
		"location": {
			"type": "Point",
			"coordinates": [
				4.9106964,
				52.3606496
			]
		},
		"name": "Mauritskade",
		"address": "Mauritskade 3",
		"construction_year": 2023,
		"type_of_use": "residential",
		"tags": "tag",
		"description": "\t\t\t\t\t",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"updated_at": "2024-06-08T12:32:42.162Z"
	},
	{
		"id": 5,
		"bag_id": "0363200012073183",
		"location": {
			"type": "Point",
			"coordinates": [
				4.8896997,
				52.3754287
			]
		},
		"name": "Bergstraat",
		"address": "Bergstraat 2",
		"construction_year": 1725,
		"type_of_use": "woonfunctie",
		"tags": "vrouwelijkeRoeiers",
		"description": "Dit is het gebouw waar het lieftallige nichtje van Quinten in woont",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"created_at": "2024-06-08T17:12:15.780Z",
		"updated_at": "2024-06-09T11:32:33.398Z"
	},
	{
		"id": 6,
		"bag_id": "0363200012086033",
		"location": {
			"type": "Point",
			"coordinates": [
				4.8813227,
				52.3579247
			]
		},
		"name": "Museumplein",
		"address": "Museumplein 6",
		"construction_year": 1973,
		"type_of_use": "bijeenkomstfunctie",
		"tags": [],
		"description": "\t\t\t\t\t",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"created_at": "2024-06-09T11:35:51.759Z"
	},
	{
		"id": 7,
		"bag_id": "0363200012097358",
		"location": {
			"type": "Point",
			"coordinates": [
				4.9071645,
				52.3591959
			]
		},
		"name": "Rhijnspoorplein",
		"address": "Rhijnspoorplein 2",
		"construction_year": 2023,
		"type_of_use": "onderwijsfunctie",
		"tags": [],
		"description": "\t\t\t\t\t",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"created_at": "2024-06-09T12:14:20.367Z"
	},
	{
		"id": 8,
		"bag_id": "0363200012073684",
		"location": {
			"type": "Point",
			"coordinates": [
				4.8853863,
				52.3599423
			]
		},
		"name": "Museumstraat",
		"address": "Museumstraat 1",
		"construction_year": 1973,
		"type_of_use": "bijeenkomstfunctie",
		"tags": "tag",
		"description": "test",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"created_at": "2024-06-09T19:01:45.058Z",
		"updated_at": "2024-06-09T19:02:29.714Z"
	},
	{
		"id": 9,
		"bag_id": "0363200000478357",
		"location": {
			"type": "Point",
			"coordinates": [
				4.942873,
				52.371476
			]
		},
		"name": "Feike de Boerlaan",
		"address": "Feike de Boerlaan 161",
		"construction_year": 2000,
		"type_of_use": "residential",
		"tags": [],
		"description": "",
		"image_urls": {},
		"timeline": [],
		"active": false,
		"created_at": "2024-06-12T08:13:22.942Z"
	}
]
