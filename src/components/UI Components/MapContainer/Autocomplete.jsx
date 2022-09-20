import React, { useEffect } from 'react'
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete'
import { Input, AutoComplete } from 'antd'

export const PlacesAutocomplete = ({
	addTitleAddress,
	isLoaded,
	placeholder,
	address,
}) => {
	const {
		ready,
		value,
		init,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete()

	const handleInput = (e) => {
		setValue(e.target.value)
	}

	const handleSelect =
		({ description }) =>
		() => {
			setValue(description, false)
			clearSuggestions()
			getGeocode({ address: description }).then((results) => {
				const { lat, lng } = getLatLng(results[0])
				addTitleAddress(lat, lng)
			})
		}

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				structured_formatting: { main_text, secondary_text },
			} = suggestion
			return {
				value: `${main_text}${secondary_text}`,
				label: (
					<span onClick={handleSelect(suggestion)}>
						<strong>{main_text}</strong> <small>{secondary_text}</small>
					</span>
				),
			}
		})

	useEffect(() => {
		if (isLoaded) init()
	}, [isLoaded, init])

	useEffect(() => {
		setValue(address)
	}, [address])

	return (
		<AutoComplete
			options={status === 'OK' && renderSuggestions()}
			onSearch={handleSelect}
			value={value}
		>
			<Input.Search
				required
				placeholder={placeholder}
				onChange={(e) => handleInput(e)}
				enterButton
			/>
		</AutoComplete>
	)
}
