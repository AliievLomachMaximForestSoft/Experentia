import React, { useEffect, useState } from 'react'
import {
	GoogleMap,
	Marker,
	withGoogleMap,
	withScriptjs,
} from 'react-google-maps'
import { defaultTheme } from '../../../utils/theme'

const MapContainer = withScriptjs(
	withGoogleMap((props) => {
		const [center, setCenter] = useState(props.defaultCenter)
		!props.data &&
			useEffect(() => {
				if (props.newCenter) {
					const mapClick = true
					props.addTitleAddress(
						props.newCenter.lat,
						props.newCenter.lng,
						mapClick
					)
					setCenter(props.newCenter)
				}
			}, [props.newCenter])

		!props.data &&
			useEffect(() => {
				if (props.defaultCenter) {
					const mapClick = true
					if (props.addTitleAddress)
						props.addTitleAddress(
							props.defaultCenter.lat,
							props.defaultCenter.lng,
							mapClick
						)
					setCenter(props.defaultCenter)
				}
			}, [props.defaultCenter])
		const defaultOptions = {
			panControl: true,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			clickableIcons: false,
			keyboardShortcuts: false,
			scrollwheel: false,
			disableDoubleClickZoom: true,
			fullscreenControl: false,
			styles: defaultTheme,
		}
		return (
			<GoogleMap
				center={center}
				defaultZoom={12}
				defaultCenter={props.data ? center : props.defaultCenter}
				options={defaultOptions}
				onClick={(e) => {
					if (!props.data && !props.propertyDatails) {
						const latitude = e.latLng.lat()
						const longtitude = e.latLng.lng()
						setCenter({ lat: latitude, lng: longtitude })
						props.getReverseGeocodingData(latitude, longtitude)
					}
				}}
			>
				<Marker icon={'/assets/OtherIcons/Location.svg'} position={center} />
			</GoogleMap>
		)
	})
)

export default MapContainer
