import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
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
import UploadGalery from '../../../UI Components/UploadImage/UploadGalery'
import { getAllRoomTypes } from '../../../../store/roomTypes'
import { getAllWiFis } from '../../../../store/wifi'
import { sendGalery } from '../../../../store/rooms'

const RoomsAddUI = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [wifi, setWifi] = useState()
	const [roomType, setRoomType] = useState()
	const [formData, setFormData] = useState()

	useEffect(() => {
		dispatch(getAllRoomTypes())
		dispatch(getAllWiFis())
		dispatch(sendGalery([]))
	}, [])

	const { loading } = useSelector((state) => state.rooms)
	const { roomTypes } = useSelector((state) => state.roomTypes)
	const { wifis } = useSelector((state) => state.wifis)
	const { local } = useSelector((state) => state.local)

	const setWifiAndRoomType = (data) => {
		const res = _.find(props.rooms.items, ['roomNumber', data.roomNumber])
		if (!res) {
			wifis.map((wifi_) => {
				return wifi_.username === data.wifi ? setWifi(wifi_) : ''
			})
			roomTypes.map((roomType_) => {
				return roomType_.name === data.roomType ? setRoomType(roomType_) : ''
			})
		} else {
			notification.error({
				message: `${t('settings.notification.roomErr')}`,
			})
			window.scrollTo(0, 0)
		}
	}

	const setIcon = () => {
		if (props.galery.length === 0) {
			notification.error({
				message: `${t('settings.notification.addPlsGallery')}`,
			})
			window.scrollTo(0, 0)
		} else dispatch(sendGalery(props.galery))
	}

	useEffect(() => {
		if (wifi && roomType && props.galeryArray.length > 0) {
			props.onSubmit(formData, roomType, wifi)
		}
	}, [roomType, wifi, props.galeryArray.length])

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
			<Content style={{ margin: 24, backgroundColor: 'white' }}>
				<Row style={{ padding: '24px 0' }}>
					<Col span={10} offset={7}>
						<ConfigProvider locale={local}>
							<Form
								colon={true}
								name='basic'
								onFinish={(e) => {
									setIcon()
									setWifiAndRoomType(e)
									setFormData(e)
								}}
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item label={`${t('settings.about.titleForGalery')}`}>
									<UploadGalery setGalery={props.setGalery} />
								</Form.Item>
								<Form.Item
									label={t('settings.rooms.titleForRoomNumber')}
									name='roomNumber'
									{...config}
								>
									<Input
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
											loading={loading}
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

export default RoomsAddUI
