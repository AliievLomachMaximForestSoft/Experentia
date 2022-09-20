import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Form, Input, Row, Modal, Button, Image } from 'antd'
const URL = process.env.REACT_APP_URL

const RoomsDetails = (props) => {
	const { t } = useTranslation()

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
			{props.record && (
				<Modal
					title={props.record.roomNumber}
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
											{props.record?.gallery.map((image) => {
												return (
													<Col
														key={props.record.gallery.length}
														style={{
															marginRight: 16,
															display: 'inline-block',
														}}
													>
														<Image
															src={
																props.record.gallery.length > 0
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
								<Form.Item
									label={t('settings.rooms.titleForRoomNumber')}
									name='roomNumber'
								>
									<Input
										placeholder={t('settings.rooms.placeholderForRoomNumber')}
										defaultValue={props.record.roomNumber}
									/>
								</Form.Item>

								<Form.Item
									label={t('settings.rooms.titleForAccommodationType')}
									name='accomodationType'
								>
									<Input
										name='accomodationType'
										placeholder={t(
											'settings.rooms.placeholderForAccommodationType'
										)}
										defaultValue={props.record.accomodationType}
									></Input>
								</Form.Item>

								<Form.Item
									label={t('settings.rooms.titleForRoomType')}
									name='roomType'
								>
									<Input
										name='roomType'
										placeholder={t('settings.rooms.placeholderForRoomType')}
										defaultValue={props.record.roomType.name}
									></Input>
								</Form.Item>

								<Form.Item label={t('settings.rooms.titleForWiFi')} name='wifi'>
									<Input
										name='wifi'
										placeholder={t('settings.rooms.placeholderForWiFi')}
										defaultValue={props.record.wifi.username}
									></Input>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default RoomsDetails
