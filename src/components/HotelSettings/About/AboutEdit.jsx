import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { useJsApiLoader } from '@react-google-maps/api'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	ConfigProvider,
	notification,
	message,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import {
	getCountries,
	sendLogo,
	sendGalery,
	isUploadGalery,
} from '../../../store/properties'
import { PlacesAutocomplete } from '../../UI Components/MapContainer/Autocomplete'
import UploadIcon from '../../UI Components/UploadImage/UploadIcon'
import MapContainer from '../../UI Components/MapContainer/MapContainer'
import UploadGalery from '../../UI Components/UploadImage/UploadGalery'

const URL = process.env.REACT_APP_URL
const KEY = process.env.REACT_APP_MAPS_KEY

const { TextArea } = Input

const AboutEdit = (props) => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const [fields, setFields] = useState([])
	const [country, setCountry] = useState()
	const [city, setCity] = useState()
	const [adressState, setAdressState] = useState()
	const [stateObj, setStateObj] = useState()
	const [cityObj, setCityObj] = useState()
	const [address, setAddress] = useState()
	const [center, setCenter] = useState()
	const [lat, setLat] = useState()
	const [lng, setLng] = useState()
	const [galery, setGalery] = useState([])
	const [formData, setFormData] = useState()

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapApiKey: KEY,
	})

	useEffect(() => {
		dispatch(getCountries())
	}, [])

	const { countries, property, loadingImage, galeryArray } = useSelector(
		(state) => state.properties
	)

	const { local } = useSelector((state) => state.local)

	const setIcon = (galery) => {
		if (galery.length === 0) {
			if (!property.gallery) {
				notification.error({
					message: `${t('settings.notification.addPlsGallery')}`,
				})
				window.scrollTo(0, 0)
			} else dispatch(isUploadGalery(property.gallery))
		} else {
			dispatch(sendGalery(galery))
		}
	}

	const setLogo = (logo) => {
		dispatch(sendLogo(logo))
	}

	useEffect(() => {
		if (property) {
			const lat = property.address.lat
			const lng = property.address.lng
			setCountry(property.address.country)
			setAdressState(property.address.state)
			setCity({
				lat,
				lng,
			})
			getReverseGeocodingData(lat, lng)

			setFields([
				{
					name: ['name'],
					value: `${property.name}`,
				},
				{
					name: ['description'],
					value: property.description === null ? '' : `${property.description}`,
				},
				{
					name: ['country'],
					value: `${property.address.country}`,
				},
				{
					name: ['state'],
					value: `${property.address.state}`,
				},
				{
					name: ['city'],
					value: `${property.address.city}`,
				},
				{
					name: ['fullAddress'],
					value: `${property.address.fullAddress}`,
				},
				{
					name: ['currency'],
					value: `${property.currency}`,
				},
				{
					name: ['phone'],
					value: `${property.phone}`,
				},
				{
					name: ['email'],
					value: `${property.email}`,
				},
				{
					name: ['status'],
					value: `${property.isActive}`,
				},
			])
		}
	}, [property, property.length])

	useEffect(() => {
		if (property) {
			if (countries) setStateObj(_.find(countries, ['name', country]))
			if (stateObj) setCityObj(_.find(stateObj.states, ['name', adressState]))
		}
	}, [country, adressState])

	const addTitleAddress = (lat, lng, mapClick) => {
		if (mapClick) {
			setLat(lat)
			setLng(lng)
		} else {
			setCenter({ lat, lng })
		}
	}

	const getReverseGeocodingData = (lat, lng) => {
		if (window.google) {
			const latlng = new window.google.maps.LatLng(lat, lng)
			const geocoder = new window.google.maps.Geocoder()
			geocoder.geocode({ latLng: latlng }, (results, status) => {
				if (status === window.google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
					setTimeout(3000)
					message.error('Many request')
				}
				if (status == window.google.maps.GeocoderStatus.OK) {
					setLat(lat)
					setLng(lng)
					setAddress(results[0].formatted_address)
				} else return
			})
		}
	}
	const getCityLanLng = (cityName) => {
		cityObj?.cities.map((city) => {
			if (city.name === cityName) {
				const { lat, lng } = city
				setCity({ lat, lng })
				getReverseGeocodingData(lat, lng)
			}
		})
	}

	useEffect(() => {
		if (galeryArray.length > 0) {
			props.onSubmit(formData, address, lat, lng)
		}
	}, [galeryArray])

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	return property ? (
		<Content style={{ backgroundColor: '#F5F5F5' }}>
			<Content
				style={{ position: 'relative', margin: 24, backgroundColor: 'white' }}
			>
				<Row style={{ padding: '24px 0 24px 0' }}>
					<Col span={10} offset={7}>
						<ConfigProvider locale={local}>
							<Form
								fields={fields}
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								onFinish={(e) => {
									setIcon(galery)
									setFormData(e)
								}}
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item
									label={`${t('settings.about.titleForLogo')} (250x100)`}
								>
									<UploadIcon
										onChange={(e) => {
											setLogo(e)
										}}
										udate={true}
										url={
											property.logo && property.logo !== 'undefined'
												? `${URL}/files/${property?.logo?.replaceAll(
														'/',
														'%2F'
												  )}`
												: ''
										}
										data='logo'
									/>
								</Form.Item>
								<Form.Item label={`${t('settings.about.titleForGalery')}`}>
									<UploadGalery
										udate={true}
										urlArr={property}
										setGalery={setGalery}
									/>
								</Form.Item>
								<Form.Item
									label={t('settings.about.titleForName')}
									name='name'
									{...config}
								>
									<Input placeholder={t('settings.about.placeholderForName')} />
								</Form.Item>
								<Form.Item
									label={t('settings.about.titleForDescription')}
									name='description'
									{...config}
								>
									<TextArea
										showCount
										placeholder={t('settings.about.placeholderForDescription')}
										maxLength={300}
										rows={2}
									/>
								</Form.Item>
								<Row justify='space-between'>
									<Col span={7}>
										<Form.Item
											label={t('settings.about.placeholderForCountry')}
											{...config}
											name='country'
										>
											<Select
												name='country'
												placeholder={t('settings.about.placeholderForCountry')}
												allowClear
												onChange={(e) => setCountry(e)}
											>
												{countries.map((country) => {
													return (
														<Select.Option
															key={country.name}
															value={country.name}
														>
															{country.name}
														</Select.Option>
													)
												})}
											</Select>
										</Form.Item>
									</Col>
									<Col span={7} offset={1}>
										<Form.Item
											name='state'
											label={t('settings.about.placeholderForState')}
											{...config}
										>
											<Select
												required
												name='state'
												placeholder={t('settings.about.placeholderForState')}
												allowClear
												onChange={(e) => setAdressState(e)}
												disabled={country ? false : true}
											>
												{stateObj?.states.map((state) => {
													return (
														<Select.Option key={state.name} value={state.name}>
															{state.name}
														</Select.Option>
													)
												})}
											</Select>
										</Form.Item>
									</Col>

									<Col span={7} offset={1}>
										<Form.Item
											name='city'
											label={t('settings.about.placeholderForCity')}
											{...config}
										>
											<Select
												name='city'
												placeholder={t('settings.about.placeholderForCity')}
												allowClear
												disabled={adressState ? false : true}
												onChange={(e) => getCityLanLng(e)}
												onClear={() => setCity()}
											>
												{cityObj?.cities.map((cities) => {
													return (
														<Select.Option
															key={cities.name}
															value={cities.name}
														>
															{cities.name}
														</Select.Option>
													)
												})}
											</Select>
										</Form.Item>
									</Col>
								</Row>
								{city ? (
									<Form.Item
										name={'fullAddress'}
										label={t('settings.about.titleForAddress')}
									>
										{isLoaded && (
											<PlacesAutocomplete
												addTitleAddress={addTitleAddress}
												isLoaded={isLoaded}
												address={address}
												placeholder={t('settings.about.placeholderForAddress')}
											/>
										)}
									</Form.Item>
								) : null}
								{city ? (
									<Form.Item>
										<MapContainer
											googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&language=${i18n.language}&v=3.exp&libraries=places,drawing,places`}
											loadingElement={<div style={{ height: `100%` }} />}
											containerElement={<div style={{ height: `200px` }} />}
											mapElement={<div style={{ height: `100%` }} />}
											getReverseGeocodingData={getReverseGeocodingData}
											newCenter={center}
											addTitleAddress={addTitleAddress}
											defaultCenter={city}
										/>
									</Form.Item>
								) : null}
								<Form.Item
									label={t('settings.about.titleForCurrency')}
									name='currency'
									{...config}
								>
									<Select
										required
										name='currency'
										placeholder={t('settings.about.placeholderForCurrency')}
										allowClear
									>
										<Select.Option value='rupia'>
											<img
												src='/assets/OtherIcons/Rupee.svg'
												style={{ marginRight: 14 }}
											/>
											Rupia
										</Select.Option>
										<Select.Option value='dollar'>
											<img
												src='/assets/OtherIcons/Dollar.svg'
												style={{ marginRight: 14 }}
											/>
											Dollar
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									label={t('settings.about.titleForPhoneNumber')}
									name='phone'
									hasFeedback
									rules={[
										{
											required: true,

											max: 13,
											min: 13,
										},
									]}
								>
									<Input
										required
										placeholder={t('settings.about.placeholderForPhoneNumber')}
									/>
								</Form.Item>
								<Form.Item
									label={t('settings.about.titleForEmail')}
									name='email'
									hasFeedback
									rules={[
										{
											required: true,
											type: 'email',
										},
									]}
								>
									<Input
										required
										placeholder={t('settings.about.placeholderForEmail')}
									/>
								</Form.Item>
								<Form.Item
									label={t('settings.about.titleForStatus')}
									name='status'
								>
									<Select
										required
										name='status'
										defaultActiveFirstOption='true'
										defaultValue='false'
									>
										<Select.Option id={1} value='true'>
											<img
												src='/assets/status/green.svg'
												style={{ marginRight: 10 }}
											/>
											{t('settings.about.activeStatus')}
										</Select.Option>
										<Select.Option id={2} value='false'>
											<img
												src='/assets/status/red.svg'
												style={{ marginRight: 10 }}
											/>
											{t('settings.about.notActiveStatus')}
										</Select.Option>
									</Select>
								</Form.Item>

								<Row justify='end'>
									<Col>
										<Button
											style={{ marginTop: 32, width: 114 }}
											htmlType='submit'
											loading={loadingImage}
											type='primary'
										>
											{t('button.titleForSave')}
										</Button>
									</Col>
								</Row>
							</Form>
						</ConfigProvider>
					</Col>
				</Row>
			</Content>
		</Content>
	) : (
		''
	)
}

export default AboutEdit
