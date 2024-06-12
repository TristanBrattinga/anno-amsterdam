import { browser } from '$app/environment'
import { location, locError, locWatchId } from '$lib'
import type { Coords } from '$types'

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

/**
 * Watches the user's location and updates the location store
 * @param id The watch id to clear
 */
export const watchLocation = (id?: number | null): void => {
	if (!browser) return
	if (!navigator.geolocation) return
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

/**
 * Gets the distance between two points in kilometers
 * @param pos1 The first point
 * @param pos2 The second point
 * @returns The distance in kilometers
 */
export const getDistance = (pos1: Coords, pos2: Coords): number => {
	const R = 6371 // Radius of the earth in km
	const dLat = deg2rad(pos2.lat - pos1.lat)
	const dLon = deg2rad(pos2.lng - pos2.lng)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(pos1.lat)) *
			Math.cos(deg2rad(pos2.lat)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c // Distance in km
	return d
}

/**
 * Gets the bearing between two points
 * @param pos1 The first point
 * @param pos2 The second point
 * @returns The bearing in degrees
 */
export const getBearing = (pos1: Coords, pos2: Coords): number => {
	const dLon = deg2rad(pos2.lng - pos1.lng)
	const lat1 = deg2rad(pos1.lat)
	const lat2 = deg2rad(pos2.lat)
	const y = Math.sin(dLon) * Math.cos(lat2)
	const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
	const rad = Math.atan2(y, x)
	const deg = rad2deg(rad)
	return (deg + 360) % 360
}

export const getCompassHeading = (alpha: number, beta: number, gamma: number) => {
	// Convert degrees to radians
	const alphaRad = alpha * (Math.PI / 180)
	const betaRad = beta * (Math.PI / 180)
	const gammaRad = gamma * (Math.PI / 180)

	// Calculate equation components
	const cA = Math.cos(alphaRad)
	const sA = Math.sin(alphaRad)
	const sB = Math.sin(betaRad)
	const cG = Math.cos(gammaRad)
	const sG = Math.sin(gammaRad)

	// Calculate A, B, C rotation components
	const rA = -cA * sG - sA * sB * cG
	const rB = -sA * sG + cA * sB * cG

	// Calculate compass heading
	let compassHeading = Math.atan(rA / rB)

	// Convert from half unit circle to whole unit circle
	if (rB < 0) {
		compassHeading += Math.PI
	} else if (rA < 0) {
		compassHeading += 2 * Math.PI
	}

	// Convert radians to degrees
	compassHeading *= 180 / Math.PI

	return compassHeading
}

/**
 * Converts degrees to radians
 * @param deg The degree value to convert
 * @returns The radian value
 */
const deg2rad = (deg: number) => {
	return deg * (Math.PI / 180)
}

/**
 * Converts radians to degrees
 * @param rad The radian value to convert
 * @returns The degree value
 */
const rad2deg = (rad: number) => {
	return (rad * 180) / Math.PI
}
