import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useJsApiLoader } from '@react-google-maps/api'
import {
	PageHeader,
	Breadcrumb,
	Row,
	Col,
	Form,
	Input,
	Button,
	message,
	Spin,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import UploadGalery from '../../../UI Components/UploadImage/UploadGalery'
import TextArea from 'antd/lib/input/TextArea'
import { PlacesAutocomplete } from '../../../UI Components/MapContainer/Autocomplete'
import MapContainer from '../../../UI Components/MapContainer/MapContainer'
import {
	sendGaleryAttraction,
	setIndexDel,
} from '../../../../store/servicesAttractions'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'

const KEY = process.env.REACT_APP_MAPS_KEY

const AttractionsAddEdit = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const [fields, setFields] = useState([])
	const [city, setCity] = useState()
	const [address, setAddress] = useState()
	const [center, setCenter] = useState()
	const [lat, setLat] = useState()
	const [lng, setLng] = useState()
	const [galery, setGalery] = useState([])
	const [attractionsItem, setAttractionsItem] = useState()

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapApiKey: KEY,
	})

	useEffect(() => {
		const getLocation = (position) => {
			setCity({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			})
			setLat(position.coords.latitude)
			setLng(position.coords.longitude)
		}
		window.navigator.geolocation.getCurrentPosition(getLocation)
	}, [])

	const {
		attractions,
		isUpdateAttractions,
		isCreateAttractions,
		loadImage,
		loading,
	} = useSelector((state) => state.settingsAttractionsType)

	const { name, type, subName, id } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		if (isUpdateAttractions || isCreateAttractions) {
			console.log('asdasdasdas')
			navigate(-1)
		}
	}, [isCreateAttractions, isUpdateAttractions])

	useEffect(() => {
		if (type === 'edit') {
			attractions.map((item) => {
				if (item.ID === Number(id)) {
					setIndexDel(item.index)
					setAttractionsItem(item)
					setAddress(item.address)
					setCity({ lat: item.lat, lng: item.lng })
					setFields([
						{
							name: ['name'],
							value: item?.name || '',
						},
						{
							name: ['description'],
							value: item?.description || '',
						},
					])
				}
			})
		}
	}, [])

	const addTitleAddress = (lat, lng, mapClick) => {
		if (mapClick) {
			setLat(lat)
			setLng(lng)
		} else {
			setCenter({ lat, lng })
			getReverseGeocodingData(lat, lng)
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

	const onSubmit = (data, galery) => {
		if (type === 'add') {
			const newData = {
				name: data.name,
				description: data.description,
				index: attractions.length ? attractions.length + 1 : 1,
				lat: lat,
				lng: lng,
				address: address,
				propertyService: {
					ID: Number(id),
				},
			}
			dispatch(sendGaleryAttraction(newData, galery))
		} else if (type === 'edit') {
			const newData = {
				ID: Number(id),
				description: data.description,
				name: data.name,
				address: address,
				lat: lat,
				lng: lng,
			}
			galery.length === 0
				? dispatch(
						sendGaleryAttraction(newData, attractionsItem.gallery, 'edit')
				  )
				: dispatch(sendGaleryAttraction(newData, galery, 'edit'))
		}
	}

	return (
		<>
			<PageHeader
				title={name}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{name}</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{type === 'edit' ? (
								<a onClick={() => navigate(-2)}>{subName}</a>
							) : (
								t('attractions.newAttraction')
							)}
						</Breadcrumb.Item>
					</Breadcrumb>
				}
			></PageHeader>
			<Content style={{ backgroundColor: '#F5F5F5' }}>
				<Content
					style={{ margin: 24, backgroundColor: 'white', position: 'relative' }}
				>
					<Row style={{ padding: '24px 0' }}>
						<Row style={{ position: 'absolute', right: '15px', top: '10px' }}>
							{type === 'edit' ? (
								<ModalDelete
									id={Number(id)}
									// index={indexDel}
									setIndexDel={setIndexDel}
									value='attractionWithIndexDetails'
									title={`${t('attractions.dellAttractionTitle')}`}
									content={`${t('attractions.dellAttractionContent')}`}
								/>
							) : null}
						</Row>
						<Col span={10} offset={7}>
							<Form
								colon={true}
								fields={fields}
								name='basic'
								onFinish={(e) => {
									onSubmit(e, galery)
								}}
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item label={`${t('settings.about.titleForGalery')}`}>
									{type === 'edit' ? (
										<UploadGalery
											udate={true}
											setGalery={setGalery}
											urlArr={attractionsItem}
										/>
									) : (
										<UploadGalery setGalery={setGalery} />
									)}
								</Form.Item>
								<Form.Item
									label={t('dish.titleForName')}
									name='name'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please enter name!',
										},
									]}
								>
									<Input placeholder={t('dish.placeholderForName')} />
								</Form.Item>
								<Form.Item
									label={t('dish.titleForDescription')}
									name='description'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please enter description!',
										},
									]}
								>
									<TextArea
										showCount
										placeholder={t('dish.placeholderForDescription')}
										maxLength={300}
										rows={2}
									/>
								</Form.Item>

								<Form.Item
									name={'fullAddress'}
									label={t('settings.about.titleForAddress')}
								>
									<PlacesAutocomplete
										addTitleAddress={addTitleAddress}
										isLoaded={isLoaded}
										address={address}
										placeholder={t('settings.about.placeholderForAddress')}
									/>
								</Form.Item>
								<Form.Item>
									{isLoaded ? (
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
									) : (
										<Spin spinning />
									)}
								</Form.Item>
								<Row justify='end'>
									<Col>
										<Button
											style={{ width: 114 }}
											htmlType='submit'
											type='primary'
											loading={loading}
										>
											{t('button.titleForSave')}
										</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</Content>
			</Content>
		</>
	)
}

export default AttractionsAddEdit
