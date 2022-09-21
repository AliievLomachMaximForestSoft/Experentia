import React, { useEffect, useState } from 'react'
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
	Typography,
} from 'antd'
import moment from 'moment'
import SkeletonUI from '../../../UI Components/Skeleton/SkeletonUI'
import { getAllRooms, getAllRoomsWithBookings } from '../../../../store/rooms'
import EmptyState, {
	customizeRenderEmpty,
} from '../../../UI Components/EmptyState/EmptyState'
import RoomsDetails from '../RoomsDetails/RoomsDetails'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'
import { getAllRoomTypes } from '../../../../store/roomTypes'
const URL = process.env.REACT_APP_URL

const RoomsList = ({ searchText }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [data, setData] = useState()
	const [loadingFilter, setLoadingFilter] = useState(false)
	const [pagination, setPagination] = useState({})
	const { roomTypes } = useSelector((state) => state.roomTypes)

	const {
		rooms,
		roomsByNumber,
		loading,
		deleteRooms,
		isCreateRooms,
		isUpdateRooms,
	} = useSelector((state) => state.rooms)

	useEffect(() => {
		dispatch(getAllRoomsWithBookings())
		dispatch(getAllRoomTypes())
	}, [])
	useEffect(() => {
		setData(rooms)
	}, [rooms])
	const messageErr = () => {
		message.error({
			content: `${t('settings.addons.itemCannotBeDeleted')}`,
		})
	}
	useEffect(() => {
		if (roomsByNumber && searchText.length > 0) setPagination(false)
	}, [roomsByNumber])

	useEffect(() => {
		if (data && searchText.length === 0)
			setPagination({
				total: data.meta.totalItems,
				showTotal: (total) =>
					`${t('pagination.paginationTotal')} ${total} ${t(
						'pagination.paginationItems'
					)}`,
				defaultPageSize: 30,
				defaultCurrent: 1,
				hideOnSinglePage: true,
				pageSize: data.meta.itemsPerPage,
				showSizeChanger: false,
			})
	}, [data, searchText])

	const columns = [
		{
			title: `${t('settings.rooms.titleForRoomNumber')}`,
			dataIndex: 'roomNumber',
			key: 'roomNumber',
			width: 155,
		},
		{
			title: `${t('settings.rooms.titleForAccommodationType')}`,
			dataIndex: 'accomodationType',
			key: 'accomodationType',
			width: 261,
			filters: [
				{
					text: 'SGL',
					value: 'SGL (Single)',
				},
				{
					text: 'DBL',
					value: 'DBL (Double)',
				},
				{
					text: 'TRPL',
					value: 'TRPL (Triple)',
				},
				{
					text: 'QDPL',
					value: 'QDPL (Quadriple)',
				},
				{
					text: 'ExB',
					value: 'ExB (Extra Bed)',
				},
				{
					text: 'ROH',
					value: 'ROH (Run of the house)',
				},
			],
		},
		{
			title: `${t('settings.rooms.titleForRoomType')}`,
			dataIndex: 'roomType',
			key: 'roomType',
			width: 371,
			render: (text, roomType) => {
				return <Typography.Text>{roomType.roomType.name}</Typography.Text>
			},
			filters:
				roomTypes &&
				roomTypes.map((type) => {
					return { text: type.name, value: type.ID }
				}),
		},
		{
			title: `${t('settings.rooms.titleForStatus')}`,
			dataIndex: 'isActive',
			key: 'isActive',
			width: 213,
			render: (text) => {
				return !text ? (
					<>
						<img style={{ marginRight: 12 }} src='/assets/status/red.svg' />
						Busy
					</>
				) : (
					<>
						<img style={{ marginRight: 12 }} src='/assets/status/green.svg' />
						Free
					</>
				)
			},
			filters: [
				{
					text: 'Free',
					value: true,
				},
				{
					text: 'Busy',
					value: false,
				},
			],
		},
		{
			title: `${t('settings.rooms.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 136,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<RoomsDetails record={record} />
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
								message={messageErr}
								id={record.ID}
								index={record.index}
								value='room'
								title={`${t('settings.rooms.dellRoomTitle')}`}
								content={`${t('settings.rooms.dellRoomContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	const edit = (record) => {
		navigate(`/hotelSettings/rooms/edit/${record.ID}`)
	}

	useEffect(() => {
		if (deleteRooms) {
			message.success(`${t('settings.rooms.dellRoomSucces')}`)
			dispatch(getAllRooms())
		}
		if (isUpdateRooms) {
			message.success({
				content: `${t('settings.rooms.updateRoomSuccess')}`,
			})
			dispatch(getAllRooms())
		}
		if (isCreateRooms) {
			message.success({
				content: `${t('settings.rooms.createdRoomSucces')}`,
			})
			dispatch(getAllRooms())
		}
	}, [deleteRooms, isUpdateRooms, isCreateRooms])

	const onChange = (pagination, filters) => {
		const url = `${URL}/admin/property/rooms?page=${pagination.current}&take=${
			pagination.pageSize
		}&${filters.accomodationType && 'accomodationTypes'}=${
			filters.accomodationType &&
			`${filters.accomodationType.map((type) => `'${type}'`)}`
		}&${filters.roomType && 'roomTypeIDs'}=${
			filters.roomType && `${filters.roomType}`
		}&${filters.isActive && 'isActive'}=${
			filters.isActive && `${filters.isActive}`
		}`

		setLoadingFilter(true)
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			credentials: 'include',
		})
			.then((res) => {
				return res.json()
			})
			.then((rooms) => {
				rooms.items.sort((a, b) =>
					a.roomNumber.localeCompare(b.roomNumber, undefined, {
						numeric: true,
						sensitivity: 'base',
					})
				)
				setData(rooms)
				setLoadingFilter(false)
			})
	}
	return !loading ? (
		roomsByNumber && searchText.length > 0 ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={pagination}
					columns={columns}
					dataSource={roomsByNumber}
					onChange={onChange}
				/>
			</ConfigProvider>
		) : data?.items ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={pagination}
					columns={columns}
					dataSource={data.items}
					rowKey={(data) => data.ID}
					onChange={onChange}
					loading={loadingFilter}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} />
		)
	) : (
		<SkeletonUI data={'rooms'} />
	)
}

export default RoomsList
