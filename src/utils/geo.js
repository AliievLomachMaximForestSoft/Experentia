const defaultCenter = {
	lat: 51.509865,
	lng: -0.118092,
}

const getBrowserLocation = () => {
	return new Promise((resolve, reject) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const { latitude: lat, longitude: lng } = pos.coords
					resolve({ lat, lng })
				},
				() => {
					reject(defaultCenter)
				}
			)
		} else {
			reject(defaultCenter)
		}
	})
}

export default getBrowserLocation
