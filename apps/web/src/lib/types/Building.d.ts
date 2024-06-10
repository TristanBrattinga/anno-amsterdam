export interface Location {
	type: string
	coordinates: number[]
}

export interface Image {
	url: string
	source: string
	year: number
	is_main: boolean
}

export interface Building {
	_id: string
	location: Location
	name: string
	address: string
	construction_year: number
	type_of_user?: string
	tags: string[]
	description?: string
	image_urls: Image[]
	timeline?: never[]
	active: boolean
	audioguids?: never[]
	created_at: string
	updated_at: string
}
