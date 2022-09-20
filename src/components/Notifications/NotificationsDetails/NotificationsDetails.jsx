import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Form, Input, Row, Modal, Button, Image } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
const URL = process.env.REACT_APP_URL

const NotificationDetails = (props) => {
	const { t } = useTranslation()

	const [isModalVisible, setIsModalVisible] = useState()

	const show = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	console.log('props', props)

	return (
		<>
			<Button style={{ padding: 0 }} type='text' onClick={() => show()}>
				<img src='/assets/action/Eye.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={props.record.title}
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
								<Form.Item label={`${t('notifications.titleForImage')}`}>
									<Image
										src={`${URL}/files/${props.record.image.replaceAll(
											'/',
											'%2F'
										)}`}
										width={238}
										preview={true}
										style={{ marginBottom: '20px' }}
									/>
									<Form.Item
										label={t('notifications.titleForTitle')}
										name='title'
									>
										<Input defaultValue={props.record.title} />
									</Form.Item>
									<Form.Item
										label={t('notifications.titleForMessage')}
										name='message'
									>
										<TextArea
											showCount
											maxLength={300}
											rows={2}
											defaultValue={props.record.message}
										/>
									</Form.Item>
									<Form.Item label={t('notifications.titleForSent')} name='se'>
										<Input
											placeholder={t('notification.sendDatetime')}
											defaultValue={moment(props.record.sendDatetime).format(
												'DD.MM.yyyy  h:mm a'
											)}
										/>
									</Form.Item>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default NotificationDetails
