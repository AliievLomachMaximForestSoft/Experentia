import {
	Breadcrumb,
	PageHeader,
	DatePicker,
	ConfigProvider,
	Row,
	Col,
} from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../UI Components/AddButton/AddButton'
import NotificationsList from './NotificationsList'
import { getAllNotifications, getDatePicker } from '../../store/notification'
import moment from 'moment'
const { RangePicker } = DatePicker

const Notifications = () => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)
	const { datePicker } = useSelector((state) => state.notifications)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllNotifications())
	}, [])

	return (
		<>
			<PageHeader
				title={t('notifications.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('notifications.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={
					<Row>
						<Col style={{ marginRight: '20px' }}>
							<ConfigProvider locale={local}>
								<RangePicker
									key={1}
									onChange={(value, s) => {
										dispatch(getDatePicker(value))
									}}
								/>
							</ConfigProvider>
						</Col>
						<Col>
							<AddButton navigate='add' data='notifications' />
						</Col>
					</Row>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<NotificationsList />
			</Content>
		</>
	)
}

export default Notifications
