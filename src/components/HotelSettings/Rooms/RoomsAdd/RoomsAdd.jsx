import React, { useEffect, useState } from 'react'
import { PageHeader, Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import RoomsAddUI from '../RoomsAddUI/RoomsAddUI'
import RoomsEditUI from '../RoomsEditUI/RoomsEditUI'
import { createRoom, updateRoom } from '../../../../store/rooms'

const RoomsAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()
	const [galery, setGalery] = useState([])
	const [roomDatails, setRoomDatails] = useState()

	const {
		rooms,
		loading,
		isCreateRooms,
		isUpdateRooms,
		deleteRooms,
		galeryArray,
		galeryUrl,
	} = useSelector((state) => state.rooms)

	const onSubmit = (data, roomType, wifi) => {
		const newRoom = {
			gallery: galeryArray,
			accomodationType: data.accomodationType,
			roomNumber: data.roomNumber,
			description: 'description',
			roomType,
			wifi,
			isActive: true,
		}
		if (params.id) {
			newRoom.ID = Number(params.id)
			dispatch(updateRoom(newRoom))
		} else {
			dispatch(createRoom(newRoom))
		}
	}

	useEffect(() => {
		if (isUpdateRooms || isCreateRooms) navigate('/hotelSettings/rooms')
	}, [isUpdateRooms, isCreateRooms])

	return (
		<>
			<PageHeader
				title={
					params.id
						? `${t('settings.rooms.titleEditRoom')}
								 ${roomDatails ? roomDatails.roomNumber : '...'}`
						: `${t('settings.rooms.titleAddNewRoom')}`
				}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{t('settings.rooms.main')}</a>
						</Breadcrumb.Item>
						{params.id ? (
							<Breadcrumb.Item>
								{t('settings.rooms.titleEditRoom')}
								{` ${roomDatails ? roomDatails.roomNumber : '...'}`}
							</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item>
								{t('settings.rooms.titleAddNewRoom')}
							</Breadcrumb.Item>
						)}
					</Breadcrumb>
				}
			></PageHeader>
			{params.id ? (
				rooms.items.map((room) => {
					return room.ID === Number(params.id) ? (
						<RoomsEditUI
							key={params.id}
							id={params.id}
							roomDatails={room}
							onSubmit={onSubmit}
							loading={loading}
							setGalery={setGalery}
							isUpdateRooms={isUpdateRooms}
							setRoomDatails={setRoomDatails}
							deleteRooms={deleteRooms}
							galeryArray={galeryArray}
							galery={galery}
							galeryUrl={galeryUrl}
						/>
					) : null
				})
			) : (
				<RoomsAddUI
					galeryArray={galeryArray}
					galeryUrl={galeryUrl}
					galery={galery}
					onSubmit={onSubmit}
					setGalery={setGalery}
					isCreateRooms={isCreateRooms}
					rooms={rooms}
				/>
			)}
		</>
	)
}

export default RoomsAdd
