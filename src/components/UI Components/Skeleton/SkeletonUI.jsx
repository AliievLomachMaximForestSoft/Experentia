import React from 'react'
import { useTranslation } from 'react-i18next'
import { Skeleton, Space, Table } from 'antd'
import { useSelector } from 'react-redux'

const SkeletonUI = ({ data }) => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)

	const columnsForServices = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: '50px',
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={25} active />
					</Space>
				)
			},
		},
		{
			title: `${t('services.titleForIcon')}`,
			dataIndex: 'icon',
			key: 'icon',
			width: '65px',
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={25} active />
					</Space>
				)
			},
		},
		{
			title: `${t('services.titleForName')}`,
			dataIndex: 'foolName',
			key: 'foolName',
			width: 712,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('services.titleForStatus')}`,
			dataIndex: 'isActive',
			key: 'isActive',
			width: 184,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 100,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('services.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: local.locale === 'hi' ? '160px' : '150px',

			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForNotifications = [
		{
			title: `${t('notifications.titleForDate')}`,
			dataIndex: 'date',
			key: 'date',
			width: '228px',
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('notifications.titleForImage')}`,
			dataIndex: 'image',
			key: 'image',
			width: '155px',
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={25} active />
					</Space>
				)
			},
		},
		{
			title: `${t('notifications.titleForTitle')}`,
			dataIndex: 'title',
			key: 'title',
			width: '512px',
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('notifications.titleForMessage')}`,
			dataIndex: 'message',
			key: 'message',
			width: '612px',
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('services.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: local.locale === 'hi' ? '160px' : '150px',
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForBookings = [
		{
			title: `${t('bookings.titleForGuest')}`,
			width: '340px',
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 130,
						}}
						paragraph={false}
					/>
				)
			},
		},

		{
			title: `${t('bookings.titleForRoom')}`,
			width: '300px',
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 200,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('bookings.titleForCheckIn')}`,
			width: '184px',
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 100,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('bookings.titleForCheckOut')}`,
			width: '184px',
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 100,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('bookings.titleForAction')}`,
			width: data === 'bookingsHistory' ? 136 : 176,
			render: () => {
				return data === 'bookingsHistory' ? (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />{' '}
					</Space>
				) : (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForRequests = [
		{
			title: `${t('requests.titleService')}`,
			width: 189,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 100,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('requests.titleForRoom')}`,
			width: 252,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('requests.titleForGuest')}`,
			width: 444,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 300,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('requests.titleForStatus')}`,
			width: 163,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 100,
						}}
						paragraph={false}
					/>
				)
			},
		},

		{
			title: `${t('requests.titleForAction')}`,
			width: 136,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]
	const columnsForRoomTypes = [
		{
			width: 76,
			render: () => {
				return <Skeleton.Avatar shape='square' size={20} active />
			},
		},
		{
			title: `${t('settings.roomTypes.titleForName')}`,
			width: 972,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.roomTypes.titleForAction')}`,
			width: 136,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]
	const columnsForWiFi = [
		{
			title: `${t('settings.wifi.titleForName')}`,
			width: 524,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.wifi.titleForPassword')}`,
			width: 524,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.wifi.titleForAction')}`,
			width: 136,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]
	const columnsForRooms = [
		{
			title: `${t('settings.rooms.titleForRoomNumber')}`,
			width: 155,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 100,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.rooms.titleForAccommodationType')}`,
			width: 261,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.rooms.titleForRoomType')}`,
			dataIndex: 'roomType',
			key: 'roomType',
			width: 371,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 180,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.rooms.titleForStatus')}`,
			dataIndex: 'status',
			key: 'status',
			width: 213,
			render: () => {
				return (
					<Skeleton
						active
						title={{
							width: 150,
						}}
						paragraph={false}
					/>
				)
			},
		},
		{
			title: `${t('settings.rooms.titleForAction')}`,
			width: 136,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsUsefulContacts = [
		{
			dataIndex: 'index',
			key: 'index',
			width: 74,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={25} active />
					</Space>
				)
			},
		},
		{
			title: `${t('settings.usefulContacts.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 534,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('settings.usefulContacts.titleForPhoneNumber')}`,
			dataIndex: 'phone',
			key: 'phone',
			width: 534,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 200,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('settings.usefulContacts.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 76,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 76,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
	]
	const columnsForServicesMenu = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 77,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
		{
			title: `${t('menu.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 300,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('menu.titleForStatus')}`,
			dataIndex: 'isActive',
			key: 'isActive',
			width: 233,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 100,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('menu.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 206,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForServicesStandart = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 76,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
		{
			title: `${t('standart.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 400,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('standart.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 116,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 30,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('standart.titleForStatus')}`,
			dataIndex: 'status',
			key: 'status',
			width: 206,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 80,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('standart.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 143,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForMenuItems = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 76,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},

		{
			title: `${t('dish.titleForImage')}`,
			dataIndex: 'image',
			key: 'image',
			width: 116,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={25} active />
					</Space>
				)
			},
		},
		{
			title: `${t('dish.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 400,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('dish.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 206,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 30,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('dish.titleForStatus')}`,
			dataIndex: 'status',
			key: 'status',
			width: 206,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 80,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('dish.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 203,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForAttractions = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 70,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},

		{
			title: `${t('dish.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 1000,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 400,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('dish.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 150,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	const columnsForAddons = [
		{
			title: `${t('settings.addons.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 824,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 400,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('settings.addons.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 184,
			render: () => {
				return (
					<Space>
						<Skeleton
							active
							title={{
								width: 50,
							}}
							paragraph={false}
						/>
					</Space>
				)
			},
		},
		{
			title: `${t('settings.addons.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 125,
			render: () => {
				return (
					<Space>
						<Skeleton.Avatar shape='square' size={20} active />
						<Skeleton.Avatar shape='square' size={20} active />
					</Space>
				)
			},
		},
	]

	return data === 'services' ? (
		<Table
			pagination={false}
			columns={columnsForServices}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'request' ? (
		<Table
			pagination={false}
			columns={columnsForRequests}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'roomTypes' ? (
		<Table
			pagination={false}
			columns={columnsForRoomTypes}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'rooms' ? (
		<Table
			pagination={false}
			columns={columnsForRooms}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'wifi' ? (
		<Table
			pagination={false}
			columns={columnsForWiFi}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'usefulContacts' ? (
		<Table
			pagination={false}
			columns={columnsUsefulContacts}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'notifications' ? (
		<Table
			pagination={false}
			columns={columnsForNotifications}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'servicesMenu' ? (
		<Table
			pagination={false}
			columns={columnsForServicesMenu}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'servicesStandart' ? (
		<Table
			pagination={false}
			columns={columnsForServicesStandart}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'bookingsHistory' ? (
		<Table
			pagination={false}
			columns={columnsForBookings}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'menuItems' ? (
		<Table
			pagination={false}
			columns={columnsForMenuItems}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'attractions' ? (
		<Table
			pagination={false}
			columns={columnsForAttractions}
			dataSource={[1, 2, 3, 4]}
		/>
	) : data === 'addons' ? (
		<Table
			pagination={false}
			columns={columnsForAddons}
			dataSource={[1, 2, 3, 4]}
		/>
	) : (
		<Table
			pagination={false}
			columns={columnsForBookings}
			dataSource={[1, 2, 3, 4]}
		/>
	)
}
Skeleton.propTypes = {}

export default SkeletonUI
