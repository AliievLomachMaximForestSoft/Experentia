import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Form, Input, Row, Modal, Button, Image } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import MapContainer from '../../../UI Components/MapContainer/MapContainer'
import { PlacesAutocomplete } from '../../../UI Components/MapContainer/Autocomplete'

const URL = process.env.REACT_APP_URL
const KEY = process.env.REACT_APP_MAPS_KEY

const AttractionsDetails = ({ record }) => {
	const { t, i18n } = useTranslation()

	const [isModalVisible, setIsModalVisible] = useState()

	const show = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<Button style={{ padding: 0 }} type='text' onClick={() => show()}>
				<img src='/assets/action/Eye.svg' alt='' />
			</Button>
			{record && (
				<Modal
					title={record.name}
					visible={isModalVisible}
					onCancel={handleCancel}
					footer={null}
					width={572}
					bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
				>
					<Row style={{ margin: '24px 0 24px 0' }}>
						<Col span={24}>
							<Form
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
							>
								<Form.Item
									label={`${t('settings.rooms.titleForGalery')}`}
									name='icon'
								>
									<Row align='center'>
										<Image.PreviewGroup>
											{record?.gallery.map((image) => {
												return (
													<Col
														key={record.gallery.length}
														style={{
															marginRight: 16,
															display: 'inline-block',
														}}
													>
														<Image
															src={
																record.gallery.length > 0
																	? `${URL}/files/${image.replaceAll(
																			'/',
																			'%2F'
																	  )}`
																	: '/assets/image/Filled.svg'
															}
															width={115}
														/>
													</Col>
												)
											})}
										</Image.PreviewGroup>
									</Row>
								</Form.Item>
								<Form.Item label={t('dish.titleForName')} name='name'>
									<Input
										defaultValue={record.name}
										placeholder={t('dish.placeholderForName')}
									/>
								</Form.Item>
								<Form.Item
									label={t('dish.titleForDescription')}
									name='description'
								>
									<TextArea
										defaultValue={record.description}
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
										address={record.address}
										placeholder={t('settings.about.placeholderForAddress')}
									/>
								</Form.Item>
								<Form.Item>
									<MapContainer
										googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&language=${i18n.language}&v=3.exp&libraries=places,drawing,places`}
										loadingElement={<div style={{ height: `100%` }} />}
										containerElement={<div style={{ height: `200px` }} />}
										mapElement={<div style={{ height: `100%` }} />}
										defaultCenter={{ lat: record.lat, lng: record.lng }}
									/>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default AttractionsDetails
