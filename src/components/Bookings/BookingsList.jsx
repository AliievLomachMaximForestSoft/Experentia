import React, { useEffect, useRef, useState } from 'react'
import { authorizationToken } from '../../utils/token'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { getAllBookings } from '../../store/bookings'
import EmptyState, {
	customizeRenderEmpty,
} from '../UI Components/EmptyState/EmptyState'
import ModalDelete from '../UI Components/Modal/ModalDelete'
import BookingsDetails from './BookingsDetails/BookingsDetails'
import UsersDetails from '../UI Components/UserDetails/UserDetails'
import BookingsCheckOut from './BookingsCheckOut/BookingsCheckOut'

const URL = process.env.REACT_APP_URL

const BookingsList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const searchInput = useRef(null)
	const [data, setData] = useState()
	const [pagination, setPagination] = useState(false)
	const [loadingFilter, setLoadingFilter] = useState(false)

	const {
		bookings,
		loading,
		deleteBookings,
		isUpdateBookings,
		isCreateBookings,
		isUploadPdf,
	} = useSelector((state) => state.bookings)

	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)

	useEffect(() => {
		dispatch(getAllBookings())
	}, [])

	useEffect(() => {
		setData(bookings.items)
	}, [bookings])

	useEffect(() => {
		if (bookings)
			setPagination({
				total: bookings.meta.totalItems,
				showTotal: (total) =>
					`${t('pagination.paginationTotal')} ${total} ${t(
						'pagination.paginationItems'
					)}`,
				defaultPageSize: 2,
				defaultCurrent: 1,
				hideOnSinglePage: true,
				pageSize: bookings.meta.itemsPerPage,
				showSizeChanger: false,
			})
	}, [])

	const handleSearch = (dataIndex) => {
		onFilter(dataIndex)
		setPagination(false)
	}

	const handleReset = (clearFilters) => {
		clearFilters()
		setData(bookings.items)
		setPagination({
			total: bookings.meta.totalItems,
			showTotal: (total) =>
				`${t('pagination.paginationTotal')} ${total} ${t(
					'pagination.paginationItems'
				)}`,
			defaultPageSize: 2,
			defaultCurrent: 1,
			hideOnSinglePage: true,
			pageSize: bookings.meta.itemsPerPage,
			showSizeChanger: false,
		})
	}

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
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
								? `${t('bookings.searchPlaceholderByGues')}`
								: `${t('bookings.searchPlaceholderByRoom')}`
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
			const url = `${URL}/admin/bookings/by-phone?phone=${searchInput.current.input.value}`
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
			const url = `${URL}/admin/bookings/by-room?room=${searchInput.current.input.value}`
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
			title: `${t('bookings.titleForGuest')}`,
			dataIndex: 'guest',
			key: 'guest',
			width: '340px',
			render: (text, record) => {
				return <UsersDetails record={record} />
			},
			...getColumnSearchProps('guest'),
		},
		{
			title: `${t('bookings.titleForRoom')}`,
			dataIndex: 'roomNumber',
			key: 'roomNumber',
			width: '300px',
			render: (text, record) => {
				return record.propertyRoom.roomNumber
			},
			...getColumnSearchProps('room'),
		},

		{
			title: `${t('bookings.titleForCheckIn')}`,
			dataIndex: 'checkIn',
			key: 'checkIn',
			width: '184px',
			render: (text, record) => {
				return moment(record.fromDate).format('DD.MM.yyyy')
			},
		},
		{
			title: `${t('bookings.titleForCheckOut')}`,
			dataIndex: 'chekOut',
			key: 'chekOut',
			width: '184px',
			render: (text, record) => {
				return moment(record.toDate).format('DD.MM.yyyy')
			},
		},
		{
			title: `${t('bookings.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: '176px',
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<BookingsCheckOut record={record} />
						</Col>
						<Col>
							<BookingsDetails record={record} />
						</Col>
						<Col>
							<Button
								style={{ padding: 0, marginLeft: 12 }}
								type='text'
								onClick={() => {
									edit(record)
								}}
							>
								<img src='/assets/action/Edit.svg' alt='' />
							</Button>
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								value='bookings'
								title={`${t('bookings.dellBookingTitle')}`}
								content={`${t('bookings.dellBookingContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	const edit = (record) => {
		navigate(`bookings/edit/${record.ID}`)
	}

	useEffect(() => {
		if (deleteBookings) {
			message.success(`${t('bookings.dellBookingSucces')}`)
			dispatch(getAllBookings())
		}
		if (isUpdateBookings) {
			if (!isUploadPdf)
				message.success({
					content: `${t('bookings.updateBookingSuccess')}`,
				})
			else
				message.success({
					content: `${t('bookings.checkOutBookingSuccess')}`,
				})
			dispatch(getAllBookings())
		}
		if (isCreateBookings) {
			message.success({
				content: `${t('bookings.createdBookingSucces')}`,
			})
			dispatch(getAllBookings())
		}
	}, [deleteBookings, isCreateBookings, isUpdateBookings])

	const onChange = (pagination) => {
		dispatch(getAllBookings(pagination.current, pagination.pageSize))
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
		<SkeletonUI />
	)
}

export default BookingsList
