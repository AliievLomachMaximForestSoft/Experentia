import React, { useEffect, useRef, useState } from 'react'
import { authorizationToken } from '../../utils/token'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	Table,
	Row,
	Col,
	Button,
	message,
	ConfigProvider,
	Space,
	Input,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import SkeletonUI from '../UI Components/Skeleton/SkeletonUI'
import { getAllBookingsHistory } from '../../store/bookings'
import EmptyState, {
	customizeRenderEmpty,
} from '../UI Components/EmptyState/EmptyState'
import ModalDelete from '../UI Components/Modal/ModalDelete'
import BookingHistoryDetails from './BookingHistoryDetails/BookingHistoryDetails'
import UsersDetails from '../UI Components/UserDetails/UserDetails'
const URL = process.env.REACT_APP_URL

const BookingHistory = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const searchInput = useRef(null)
	const [data, setData] = useState()
	const [pagination, setPagination] = useState({})
	const [loadingFilter, setLoadingFilter] = useState(false)
	const { bookingsHistory, loading, deleteBookings } = useSelector(
		(state) => state.bookings
	)

	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)

	useEffect(() => {
		dispatch(getAllBookingsHistory())
	}, [])

	useEffect(() => {
		setData(bookingsHistory.items)
	}, [bookingsHistory])

	useEffect(() => {
		if (bookingsHistory)
			setPagination({
				total: bookingsHistory.meta.totalItems,
				showTotal: (total) =>
					`${t('pagination.paginationTotal')} ${total} ${t(
						'pagination.paginationItems'
					)}`,
				defaultPageSize: 2,
				defaultCurrent: 1,
				hideOnSinglePage: true,
				pageSize: bookingsHistory.meta.itemsPerPage,
				showSizeChanger: false,
			})
	}, [])

	const handleSearch = (dataIndex) => {
		onFilter(dataIndex)
		setPagination(false)
	}

	const handleReset = (clearFilters) => {
		clearFilters()
		setData(bookingsHistory.items)
		setPagination({
			total: bookingsHistory.meta.totalItems,
			showTotal: (total) =>
				`${t('pagination.paginationTotal')} ${total} ${t(
					'pagination.paginationItems'
				)}`,
			defaultPageSize: 2,
			defaultCurrent: 1,
			hideOnSinglePage: true,
			pageSize: bookingsHistory.meta.itemsPerPage,
			showSizeChanger: false,
		})
	}

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div
				style={{
					padding: 8,
				}}
			>
				<ConfigProvider locale={local}>
					<Input
						ref={searchInput}
						placeholder={
							dataIndex === 'guest'
								? `${t('bookingsHistory.searchPlaceholderByGues')}`
								: `${t('bookingsHistory.searchPlaceholderByRoom')}`
						}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(
								e.target.value ? [e.target.value.replace(/[^+\d\s]/g, '')] : []
							)
						}
						onPressEnter={() => handleSearch(dataIndex)}
						style={{
							marginBottom: 8,
							display: 'block',
						}}
					/>
				</ConfigProvider>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(dataIndex)}
						size='small'
						style={{
							width: 80,
							marginLeft: 80,
						}}
					>
						{t('button.searchEnterButton')}
					</Button>
					<Button
						type='text'
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 80,
						}}
					>
						{t('button.resetEnterButton')}
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
					fontSize: '22px',
				}}
			/>
		),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
	})

	const onFilter = (dataIndex) => {
		if (dataIndex === 'guest') {
			const url = `${URL}/admin/bookings/history/by-phone?phone=${searchInput.current.input.value}`
			setLoadingFilter(true)
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((Search) => {
					setData(Search)
					setLoadingFilter(false)
				})
		} else {
			const url = `${URL}/admin/bookings/history/by-room?room=${searchInput.current.input.value}`
			setLoadingFilter(true)
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((Search) => {
					setData(Search)
					setLoadingFilter(false)
				})
		}
	}

	const columns = [
		{
			title: `${t('bookingsHistory.titleForGuest')}`,
			dataIndex: 'guest',
			key: 'guest',
			width: '340px',
			render: (text, record) => {
				return <UsersDetails record={record} />
			},
			...getColumnSearchProps('guest'),
		},
		{
			title: `${t('bookingsHistory.titleForRoom')}`,
			dataIndex: 'roomNumber',
			key: 'roomNumber',
			width: '300px',
			render: (text, record) => {
				return record.propertyRoom.roomNumber
			},
			...getColumnSearchProps('room'),
		},

		{
			title: `${t('bookingsHistory.titleForCheckIn')}`,
			dataIndex: 'checkIn',
			key: 'checkIn',
			width: '184px',
			render: (text, record) => {
				return moment(record.fromDate).format('DD.MM.yyyy')
			},
		},
		{
			title: `${t('bookingsHistory.titleForCheckOut')}`,
			dataIndex: 'chekOut',
			key: 'chekOut',
			width: '184px',
			render: (text, record) => {
				return moment(record.toDate).format('DD.MM.yyyy')
			},
		},
		{
			title: `${t('bookingsHistory.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: '136px',
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<BookingHistoryDetails record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								value='bookingsHistory'
								title={`${t('bookingsHistory.dellBookingTitle')}`}
								content={`${t('bookingsHistory.dellBookingContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteBookings) {
			message.success(`${t('bookingsHistory.dellBookingSucces')}`)
			dispatch(getAllBookingsHistory())
		}
	}, [deleteBookings])

	const onChange = (pagination) => {
		dispatch(getAllBookingsHistory(pagination.current, pagination.pageSize))
	}

	return !loading ? (
		data ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty} locale={local}>
				<Table
					pagination={pagination}
					columns={columns}
					dataSource={data}
					loading={loadingFilter}
					onChange={onChange}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} type={'bookings'} />
		)
	) : (
		<SkeletonUI data='bookingsHistory' />
	)
}

export default BookingHistory
