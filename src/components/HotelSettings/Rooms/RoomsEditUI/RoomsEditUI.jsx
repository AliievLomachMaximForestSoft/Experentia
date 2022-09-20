import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	notification,
	ConfigProvider,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'
import UploadGalery from '../../../UI Components/UploadImage/UploadGalery'
import { isUploadGalery, sendGalery } from '../../../../store/rooms'
import { getAllRoomTypes } from '../../../../store/roomTypes'
import { getAllWiFis } from '../../../../store/wifi'

const RoomsEditUI = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [formData, setFormData] = useState()
	const [wifi, setWifi] = useState()
	const [roomType, setRoomType] = useState()
	const [fields, setFields] = useState([])

	const { roomTypes } = useSelector((state) => state.roomTypes)
	const { wifis } = useSelector((state) => state.wifis)
	const { local } = useSelector((state) => state.local)

	useEffect(() => {
		dispatch(getAllRoomTypes())
		dispatch(getAllWiFis())
		dispatch(sendGalery([]))
		props.setRoomDatails(props.roomDatails)
	}, [])

	const setIcon = () => {
		if (props.galery.length === 0) {
			if (props.roomDatails.gallery.length === 0) {
				notification.error({
					message: `${t('settings.notification.addPlsGallery')}`,
				})
				window.scrollTo(0, 0)
			} else {
				dispatch(isUploadGalery(props.roomDatails.gallery))
			}
		} else dispatch(sendGalery(props.galery))
	}

	useEffect(() => {
		if (
			formData &&
			props.galeryArray.length > 0 &&
			(props.galery.length > 0 || props.roomDatails.gallery.length > 0)
		) {
			props.onSubmit(formData, roomType, wifi)
		}
	}, [formData, props.galeryArray.length])

	useEffect(() => {
		if (props.id && props.roomDatails) {
			setRoomType(props.roomDatails.roomType)
			setWifi(props.roomDatails.wifi)
			setFields([
				{
					name: ['roomNumber'],
					value: `${props.roomDatails.roomNumber}`,
				},
				{
					name: ['roomType'],
					value: `${props.roomDatails.roomType.name}`,
				},
				{
					name: ['wifi'],
					value: `${props.roomDatails.wifi.username}`,
				},
				{
					name: ['accomodationType'],
					value: `${props.roomDatails.accomodationType}`,
				},
				,
			])
		}
	}, [props.roomDatails])

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	return (
		<Content style={{ backgroundColor: '#F5F5F5' }}>
			<Content
				style={{ position: 'relative', margin: 24, backgroundColor: 'white' }}
			>
				<Row style={{ position: 'absolute', right: '15px', top: '10px' }}>
					{props.roomDatails ? (
						<ModalDelete
							id={props.id}
							authorizationToken={props.authorizationToken}
							value='roomDetails'
							title={`${t('settings.rooms.dellRoomTitle')}`}
							content={`${t('settings.rooms.dellRoomContent')}`}
							deleteService={props.deleteService}
						/>
					) : null}
				</Row>
				<Row style={{ padding: '24px 0 24px 0' }}>
					<Col span={10} offset={7}>
						<ConfigProvider locale={local}>
							<Form
								colon={true}
								fields={fields}
								name='basic'
								onFinish={(e) => {
									setFormData(e)
									setIcon()
								}}
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item label={`${t('settings.about.titleForGalery')}`}>
									<UploadGalery
										udate={true}
										setGalery={props.setGalery}
										urlArr={props.roomDatails}
										galeryUrl={props.galeryUrl}
									/>
								</Form.Item>
								<Form.Item
									label={t('settings.rooms.titleForRoomNumber')}
									name='roomNumber'
									{...config}
								>
									<Input
										name='roomNumber'
										placeholder={t('settings.rooms.placeholderForRoomNumber')}
									/>
								</Form.Item>

								<Form.Item
									label={t('settings.rooms.titleForAccommodationType')}
									name='accomodationType'
									{...config}
								>
									<Select
										name='accomodationType'
										placeholder={t(
											'settings.rooms.placeholderForAccommodationType'
										)}
										allowClear
									>
										<Select.Option value='SGL (Single)'>
											SGL (Single)
										</Select.Option>
										<Select.Option value='DBL (Double)'>
											DBL (Double)
										</Select.Option>
										<Select.Option value='TRPL (Triple)'>
											TRPL (Triple)
										</Select.Option>
										<Select.Option value='QDPL (Quadriple)'>
											QDPL (Quadriple)
										</Select.Option>
										<Select.Option value='ExB (Extra Bed)'>
											ExB (Extra Bed)
										</Select.Option>
										<Select.Option value='ROH (Run of the house)'>
											ROH (Run of the house)
										</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item
									label={t('settings.rooms.titleForRoomType')}
									name='roomType'
									{...config}
								>
									<Select
										name='roomType'
										placeholder={t('settings.rooms.placeholderForRoomType')}
										allowClear
										onSelect={(e) => {
											roomTypes.map((roomType_) => {
												return roomType_.name === e
													? setRoomType(roomType_)
													: ''
											})
										}}
									>
										{roomTypes &&
											roomTypes.map((type) => {
												return (
													<Select.Option key={type.name} value={type.name}>
														{type.name}
													</Select.Option>
												)
											})}
									</Select>
								</Form.Item>
								<Form.Item
									label={t('settings.rooms.titleForWiFi')}
									name='wifi'
									{...config}
								>
									<Select
										name='wifi'
										placeholder={t('settings.rooms.placeholderForWiFi')}
										allowClear
										onSelect={(e) =>
											wifis.map((wifi_) => {
												return wifi_.username === e ? setWifi(wifi_) : ''
											})
										}
									>
										{wifis &&
											wifis.map((type) => {
												return (
													<Select.Option
														key={type.username}
														value={type.username}
													>
														{type.username}
													</Select.Option>
												)
											})}
									</Select>
								</Form.Item>
								<Row justify='end'>
									<Col>
										<Button
											style={{ width: 114 }}
											htmlType='submit'
											type='primary'
											loading={props.isCreateService}
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
	)
}

export default RoomsEditUI
