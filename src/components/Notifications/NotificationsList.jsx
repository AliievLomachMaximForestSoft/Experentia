import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
	Col,
	ConfigProvider,
	Image,
	message,
	Pagination,
	Row,
	Table,
} from 'antd'
import { getAllNotifications } from '../../store/notification'
import EmptyState, {
	customizeRenderEmpty,
} from '../UI Components/EmptyState/EmptyState'
import ModalDelete from '../UI Components/Modal/ModalDelete'
import SkeletonUI from '../UI Components/Skeleton/SkeletonUI'
import NotificationDetails from './NotificationsDetails/NotificationsDetails'
const URL = process.env.REACT_APP_URL

const NotificationsList = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { local } = useSelector((state) => state.local)
	const {
		notifications,
		datePickerStart,
		datePickerEnd,
		isCreateNotification,
		deleteNotification,
		loading,
	} = useSelector((state) => state.notifications)

	const columns = [
		{
			title: `${t('notifications.titleForDate')}`,
			dataIndex: 'date',
			key: 'date',
			width: '228px',
			render: (text, record) => {
				return <>{moment(record.sendDatetime).format(`DD.MM.yyyy  h:mm a`)}</>
			},
		},
		{
			title: `${t('notifications.titleForImage')}`,
			dataIndex: 'image',
			key: 'icon',
			width: '155px',
			render: (text, record) => {
				return (
					<Image
						preview={false}
						src={`${URL}/files/${record.image.replaceAll('/', '%2F')}`}
						style={{
							width: 32,
						}}
					/>
				)
			},
		},
		{
			title: `${t('notifications.titleForTitle')}`,
			dataIndex: 'title',
			key: 'title',
			width: '512px',
		},
		{
			title: `${t('notifications.titleForMessage')}`,
			dataIndex: 'message',
			key: 'message',
			width: '612px',
		},
		{
			title: `${t('services.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: local.locale === 'hi' ? '160px' : '150px',
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<NotificationDetails record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								value='notifications'
								title={`${t('notifications.dellNotificationsTitle')}`}
								content={`${t('notifications.dellNotificationsContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteNotification) {
			message.success(`${t('notifications.dellNotificationsSuccess')}`)
			dispatch(getAllNotifications())
		}
		if (isCreateNotification) {
			message.success(`${t('notifications.createdNotificationSuccess')}`)
			dispatch(getAllNotifications())
		}
	}, [deleteNotification, isCreateNotification])

	const onChangePage = (page, pageSize) => {
		dispatch(
			getAllNotifications(page, pageSize, datePickerStart, datePickerEnd)
		)
	}

	return !loading ? (
		notifications.items ? (
			<ConfigProvider locale={local} renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={notifications.items}
				/>
				<Pagination
					style={{ textAlign: 'right', marginTop: 14 }}
					total={notifications.meta.totalItems}
					showTotal={(total) =>
						`${t('pagination.paginationTotal')} ${total} ${t(
							'pagination.paginationItems'
						)}`
					}
					defaultPageSize={30}
					current={notifications.meta.currentPage}
					hideOnSinglePage
					pageSize={notifications.meta.itemsPerPage}
					showSizeChanger={false}
					onChange={onChangePage}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={[]} />
		)
	) : (
		<SkeletonUI data={'notifications'} />
	)
}

export default NotificationsList
