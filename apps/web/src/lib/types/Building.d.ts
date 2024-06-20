export interface Location {
	coordinates: number[]
}

export interface Image {
	url: string
	source: string
	year: number
	is_main: boolean
}

export type BuildingType =
	| 'residential'
	| 'industrial'
	| 'commercial'
	| 'educational'
	| 'recreational'

export interface BuildingTags {
	en: string[]
	nl: string[]
}

export interface Building {
	id: number
	location: Location
	name: string
	address: string
	construction_year: number
	type_of_user?: BuildingType
	tags: BuildingTags
	description?: string
	image_urls: Image[]
	timeline?: never[]
	active: boolean
	audioguids?: never[]
	created_at: string
	updated_at: string
	distance?: number
}

export type NewBuilding = Omit<Building, 'id' | 'created_at' | 'updated_at' | 'distance'>
