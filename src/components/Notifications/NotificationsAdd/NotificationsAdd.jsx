import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, Button, Col, Form, Input, PageHeader, Row } from 'antd'
import { useNavigate } from 'react-router'
import { Content } from 'antd/lib/layout/layout'
import TextArea from 'antd/lib/input/TextArea'
import UploadIcon from '../../UI Components/UploadImage/UploadIcon'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, sendIcon } from '../../../store/notification'

const NotificationsAdd = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { iconUrl, loading, loadingIcon } = useSelector(
		(state) => state.notifications
	)

	const onSubmit = (e) => {
		let today = new Date()
		today.toISOString()
		const newNotification = {
			image: iconUrl,
			sendDatetime: today.toISOString(),
			...e,
		}

		dispatch(createNotification(newNotification))
		navigate('/notifications')
	}

	return (
		<>
			<PageHeader
				title={`${t('notifications.newNotifications')}`}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{t('notifications.main')}</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{t('notifications.newNotifications')}
						</Breadcrumb.Item>
					</Breadcrumb>
				}
			/>
			<Content style={{ backgroundColor: '#F5F5F5' }}>
				<Content style={{ margin: 24, backgroundColor: 'white' }}>
					<Row style={{ padding: '24px 0' }}>
						<Col span={10} offset={7}>
							<Form
								colon={true}
								name='basic'
								onFinish={onSubmit}
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item label={`${t('notifications.titleForImage')}`}>
									<UploadIcon
										width={228}
										loadingIcon={loadingIcon}
										onChange={(e) => {
											dispatch(sendIcon(e))
										}}
										data='image'
									/>
								</Form.Item>
								<Form.Item
									label={t('notifications.titleForTitle')}
									name='title'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please enter title!',
										},
									]}
								>
									<Input placeholder={t('notifications.placeholderForTitle')} />
								</Form.Item>
								<Form.Item
									label={t('notifications.titleForMessage')}
									name='message'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please input enter message!',
										},
									]}
								>
									<TextArea
										showCount
										placeholder={t('notifications.placeholderForMessage')}
										maxLength={300}
										rows={2}
									/>
								</Form.Item>
								<Row justify='end'>
									<Col>
										<Button
											style={{ width: 114 }}
											htmlType='submit'
											type='primary'
											loading={loading}
											disabled={loadingIcon}
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

export default NotificationsAdd
