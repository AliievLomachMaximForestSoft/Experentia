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
import {
	getAllNotifications,
	getDatePickerEnd,
	getDatePickerStart,
} from '../../store/notification'
import moment from 'moment'
const { RangePicker } = DatePicker

const Notifications = () => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)
	const { datePickerStart, datePickerEnd } = useSelector(
		(state) => state.notifications
	)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllNotifications(1, 30, datePickerStart, datePickerEnd))
	}, [datePickerStart, datePickerEnd])

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
									onChange={(value) => {
										if (value) {
											const start = moment(value[0])
												.set({
													hour: 0,
													minute: 0,
													second: 0,
												})
												.toISOString()

											const end = moment(value[1])
												.set({
													hour: 0,
													minute: 0,
													second: 0,
												})
												.add(1, 'days')
												.toISOString()
											dispatch(getDatePickerStart(start))
											dispatch(getDatePickerEnd(end))
										} else {
											dispatch(getDatePickerStart(null))
											dispatch(getDatePickerEnd(null))
										}
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
