import { browser } from '$app/environment'
import { location, locError, locWatchId } from '$lib'

/**
export class GeoLocationWrapper extends Geolocation {
	override getCurrentPosition = (
		successCallback: PositionCallback,
		errorCallback?: PositionErrorCallback | null | undefined,
		options?: PositionOptions | undefined
	): void => {
		super.getCurrentPosition(
			(position) => {
				successCallback(position)
				location.set({ lat: position.coords.latitude, lng: position.coords.longitude })
			},
			(positionError) => {
				errorCallback?.(positionError)
				locError.set(positionError)
			},
			options
		)
	}

	override watchPosition(
		successCallback: PositionCallback,
		errorCallback?: PositionErrorCallback | null | undefined,
		options?: PositionOptions | undefined
	): number {
		const watchId = super.watchPosition(
			(position) => {
				successCallback(position)
				location.set({ lat: position.coords.latitude, lng: position.coords.longitude })
			},
			(positionError) => {
				errorCallback?.(positionError)
				locError.set(positionError)
			},
			options
		)
		locWatchId.set(watchId)
		return watchId
	}
} */

export const watchLocation = (id?: number | null) => {
	if (!browser) return
	if (!navigator.geolocation) {
	}
	locError.set(null)
	if (id) navigator.geolocation.clearWatch(id)
	const watchId = navigator.geolocation.watchPosition(
		(pos) => {
			location.set({ lat: pos.coords.latitude, lng: pos.coords.longitude })
		},
		(e) => {
			locError.set(e)
			alert(`ERROR(${e.code}): ${e.message}`)
		}
	)
	locWatchId.set(watchId)
}

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
	var R = 6371 // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1) // deg2rad below
	var dLon = deg2rad(lon2 - lon1)
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	var d = R * c // Distance in km
	return d
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180)
}
