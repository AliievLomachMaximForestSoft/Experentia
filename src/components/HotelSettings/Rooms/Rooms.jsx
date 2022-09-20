import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { PageHeader, Breadcrumb, Row, Col, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Content } from 'antd/es/layout/layout'
import {
	getAllRooms,
	getRoomsByNumber,
	updateStatusRoom,
} from '../../../store/rooms'
import RoomsList from './RoomsList/RoomsList'
import AddButton from '../../UI Components/AddButton/AddButton'
import { getSubscription } from '../../../store/subscription'
const { Search } = Input

const Rooms = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [searchText, setSearchText] = useState('')
	const { loadingBySearch, rooms } = useSelector((state) => state.rooms)

	useEffect(() => {
		dispatch(getSubscription())
		dispatch(getAllRooms())
	}, [])

	useEffect(() => {
		if (rooms) {
			const newdata = rooms.items
			for (let i = 0; i < newdata.length; i++) {
				if (newdata[i].bookings.length > 0) {
					for (let j = 0; j < newdata[i].bookings.length; j++) {
						if (
							moment(newdata[i].bookings[j].fromDate).isBefore(
								moment(new Date())
							) &&
							moment(newdata[i].bookings[j].toDate).isAfter(moment(new Date()))
						) {
							newdata[i].isActive = false
							dispatch(
								updateStatusRoom({
									isActive: newdata[i].isActive,
									ID: newdata[i].ID,
								})
							)
						} else {
							newdata[i].isActive = true
							dispatch(
								updateStatusRoom({
									isActive: newdata[i].isActive,
									ID: newdata[i].ID,
								})
							)
						}
					}
				} else {
					newdata[i].isActive = true
					dispatch(
						updateStatusRoom({
							isActive: newdata[i].isActive,
							ID: newdata[i].ID,
						})
					)
				}
			}
		}
	}, [rooms])

	return (
		<>
			<PageHeader
				title={t('settings.rooms.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>{t('settings.rooms.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={<AddButton data='rooms' navigate='/hotelSettings/rooms/add' />}
			>
				<Row justify='space-between'>
					<Col
						xxl={{ span: 8, offset: 8 }}
						xl={{ span: 10, offset: 7 }}
						lg={{ span: 10, offset: 6 }}
						md={{ span: 12 }}
						sm={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<Search
							placeholder={t('settings.rooms.searchPlaceholderForBookings')}
							allowClear
							loading={loadingBySearch}
							enterButton={<SearchOutlined />}
							size='medium'
							value={searchText}
							onChange={(e) => {
								setSearchText(e.target.value.replace(/[^+\d\s]/g, ''))
								dispatch(getRoomsByNumber(e.target.value.replace(/\D/g, '')))
							}}
						/>
					</Col>
				</Row>
			</PageHeader>
			<Content style={{ margin: '8px 24px 24px' }}>
				<RoomsList searchText={searchText} />
			</Content>
		</>
	)
}

export default Rooms
