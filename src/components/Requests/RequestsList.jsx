import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
	Table,
	Row,
	Col,
	message,
	ConfigProvider,
	Pagination,
	Typography,
	Image,
	Tag,
} from 'antd'
import { getAllRequests } from '../../store/socket'
import SkeletonUI from '../UI Components/Skeleton/SkeletonUI'
import EmptyState, {
	customizeRenderEmpty,
} from '../UI Components/EmptyState/EmptyState'
import ModalDelete from '../UI Components/Modal/ModalDelete'
import RequestsModal from './RequestsModal/RequestsModal'
import UsersDetails from '../UI Components/UserDetails/UserDetails'
const URL = process.env.REACT_APP_URL

const RequestsList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { requests, loading, deleteRequests, isUpdateRequests } = useSelector(
		(state) => state.socket
	)

	useEffect(() => {
		dispatch(getAllRequests())
	}, [])

	const columns = [
		{
			title: `${t('requests.titleService')}`,
			dataIndex: 'service',
			key: 'service',
			width: 189,
			render: (text, record) => {
				return (
					<>
						<Image
							preview={false}
							src={`${URL}/files/${record.propertyService.icon.replaceAll(
								'/',
								'%2F'
							)}`}
							style={{
								width: 32,
							}}
						/>
						<Typography.Text style={{ marginLeft: 14 }}>
							{record.propertyService.name}
						</Typography.Text>
					</>
				)
			},
		},
		{
			title: `${t('requests.titleForRoom')}`,
			dataIndex: 'room',
			key: 'room',
			width: 252,
			render: (text, record) => {
				return record.propertyRoom.roomNumber
			},
		},
		{
			title: `${t('requests.titleForGuest')}`,
			dataIndex: 'name',
			key: 'name',
			width: 444,
			render: (text, record) => {
				return <UsersDetails record={record} />
			},
		},
		{
			title: `${t('requests.titleForStatus')}`,
			dataIndex: 'status',
			key: 'status',
			width: 163,
			render: (text, record) => {
				return (
					<Tag
						color={
							record.status === 'New'
								? 'purple'
								: record.status === 'Accepted'
								? 'orange'
								: record.status === 'Completed'
								? 'green'
								: 'error'
						}
					>
						{record.status}
					</Tag>
				)
			},
		},
		{
			title: `${t('requests.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 136,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<RequestsModal record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								value='requests'
								title={`${t('requests.dellRequestsTitle')}`}
								content={`${t('requests.dellRequestsContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteRequests) {
			message.success(`${t('requests.dellRequestsSucces')}`)
			dispatch(getAllRequests())
		}
		if (isUpdateRequests && !loading) {
			message.success({
				content: `${t('requests.updateRequestsSuccess')}`,
			})
			dispatch(getAllRequests())
		}
	}, [deleteRequests, isUpdateRequests])

	const onChangePage = (page, pageSize) => {
		dispatch(getAllRequests(page, pageSize))
	}

	return !loading ? (
		requests.items ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					rowClassName={(record) => {
						return record.status === 'New' &&
							moment()
								.endOf('day')
								.isSame(moment(record.created).endOf('day')) &&
							moment().hour() - moment(record.created).utc(false).hour() >= 1
							? 'table-row-red'
							: moment()
									.endOf('day')
									.isSame(moment(record.created).endOf('day')) &&
							  record.status === 'New'
							? 'table-row-green'
							: moment()
									.endOf('day')
									.isAfter(moment(record.created).endOf('day')) &&
							  record.status === 'New' &&
							  'table-row-red'
					}}
					pagination={false}
					columns={columns}
					dataSource={requests.items}
				/>
				<Pagination
					style={{ textAlign: 'right', marginTop: 14 }}
					total={requests.meta.totalItems}
					showTotal={(total) =>
						`${t('pagination.paginationTotal')} ${total} ${t(
							'pagination.paginationItems'
						)}`
					}
					defaultPageSize={30}
					hideOnSinglePage
					current={requests.meta.currentPage}
					pageSize={requests.meta.itemsPerPage}
					showSizeChanger={false}
					onChange={onChangePage}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} type={'services'} />
		)
	) : (
		<SkeletonUI data='request' />
	)
}

export default RequestsList
