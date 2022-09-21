import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb, Button } from 'antd'
import { Content } from 'antd/es/layout/layout'
import BookingsList from './BookingsList'
import AddButton from '../UI Components/AddButton/AddButton'

const Bookings = () => {
	const { t } = useTranslation()

	const { socket } = useSelector((state) => state.socket)

	const onClick = () => {
		socket &&
			socket.emit(
				'createServiceOrder',
				{
					created: '2022-09-20T16:00:43.884Z',
					status: 'New',
					comment: 'string',
					attachment: ['string'],
					file: null,
					propertyRoom: {
						ID: 103,
					},
					guest: {
						ID: 211,
					},
					propertyService: {
						// ID: 150, //taxi
						ID: 148, //standart
						// ID: 147,
					},
					// foodOrderHeader: {
					// 	orderTotal: 12,
					// 	itemTotal: 1,
					// 	totalTax: 2,
					// 	serviceCharge: 0,
					// 	tipAmount: 0,
					// 	foodOrderDetails: [
					// 		{
					// 			quantity: 3,
					// 			specialNotes: 'string',
					// 			menuItem: {
					// 				ID: 137,
					// 			},
					// 			foodOrderAddons: [
					// 				{
					// 					quantity: 1,
					// 					addon: {
					// 						ID: 102,
					// 					},
					// 				},
					// 				{
					// 					quantity: 3,
					// 					addon: {
					// 						ID: 102,
					// 					},
					// 				},
					// 			],
					// 		},
					// 		{
					// 			quantity: 6,
					// 			specialNotes: 'string',
					// 			menuItem: {
					// 				ID: 137,
					// 			},
					// 			foodOrderAddons: [
					// 				{
					// 					quantity: 1,
					// 					addon: {
					// 						ID: 102,
					// 					},
					// 				},
					// 			],
					// 		},
					// 	],
					// },
					serviceStandarts: [
						{
							ID: 92,
						},
						{
							ID: 91,
						},
					],
					// taxiOrder: {
					// 	created: '2022-09-20T16:00:43.884Z',
					// 	accepted: '2022-09-02T07:40:43.884Z',
					// 	completed: '2022-08-31T07:40:43.884Z',
					// 	location: 'Cherkasy, Ukraine',
					// 	lat: 49.444431,
					// 	lng: 32.059769,

					// 	time: '2022-08-31T07:40:43.884Z',
					// 	file: null,
					// 	guest: {
					// 		ID: 217,
					// 	},
					// },
				},
				(data) => {
					console.log('data!!!!!!!!!!!!', data)
				}
			)
	}

	const onSend = () => {
		socket &&
			socket.emit(
				'createMessage',
				{
					dateTime: new Date(),
					from: 'Noble',
					text: 'Help me!!!!!',
					guest: { ID: 232 },
					propertyRoom: { ID: 54 },
				},
				(data) => {
					console.log('data!!!!!!!!!!!!', data)
				}
			)
	}

	const update = () => {
		socket.emit(
			'updateMessage',
			{
				ID: 721,
				isDelivered: true,
				isReaded: true,
			},
			(data) => {
				console.log('dataUpdate', data)
			}
		)
	}

	return (
		<>
			<PageHeader
				title={t('bookings.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('bookings.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={
					<>
						<AddButton navigate='/bookings/add' />
						<Button onClick={onClick}>Create Request</Button>
						<Button onClick={onSend}>Send Mess</Button>
						<Button onClick={update}>Update Mess</Button>
					</>
				}
			/>
			<Content style={{ margin: '0 24px' }}>
				<BookingsList />
			</Content>
		</>
	)
}

export default Bookings
