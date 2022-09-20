import React, { useEffect, useState } from 'react'
import { PageHeader, Breadcrumb, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import BokingsAddUI from '../BookingsAddUI/BokingsAddUI'
import BookingsEditUI from '../BookingsEditUI/BookingsEditUI'
import { createBooking, updateBooking } from '../../../store/bookings'

const BokingsAddEdit = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [bookingsDetails, setBookingsDetails] = useState()

	const {
		loading,
		loadingDetails,
		isUpdateBookings,
		isCreateBookings,
		bookings,
	} = useSelector((state) => state.bookings)

	const params = useParams()

	const onSubmit = (newData) => {
		if (params.id) {
			newData.ID = Number(params.id)
			dispatch(updateBooking(newData))
		} else {
			dispatch(createBooking(newData))
		}
	}

	useEffect(() => {
		if (isUpdateBookings || isCreateBookings) navigate('/')
	}, [isUpdateBookings, isCreateBookings])

	return (
		<>
			<PageHeader
				title={
					params.id
						? `${t('bookings.titleEditBookings')}
								 ${bookingsDetails ? bookingsDetails.propertyRoom.roomNumber : '...'}`
						: `${t('bookings.titleAddNewBookings')}`
				}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{t('bookings.main')}</a>
						</Breadcrumb.Item>
						{params.id ? (
							<Breadcrumb.Item>
								{t('bookings.titleEditBookings')}
								{` ${
									bookingsDetails
										? bookingsDetails.propertyRoom.roomNumber
										: '...'
								}`}
							</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item>
								{t('bookings.titleAddNewBookings')}
							</Breadcrumb.Item>
						)}
					</Breadcrumb>
				}
			></PageHeader>
			{params.id ? (
				bookings.items ? (
					bookings.items.map((booking) => {
						return booking.ID === Number(params.id) ? (
							<BookingsEditUI
								key={params.id}
								id={params.id}
								bookingsDetails={booking}
								onSubmit={onSubmit}
								loading={loading}
								isUpdateBookings={isUpdateBookings}
								setBookingsDetails={setBookingsDetails}
							/>
						) : null
					})
				) : (
					<div
						style={{
							textAlign: 'center',
							padding: '18%',
						}}
					>
						<Button type='primary' onClick={() => navigate('/')}>
							{`${t('button.BackHome')}`}
						</Button>
					</div>
				)
			) : (
				<BokingsAddUI onSubmit={onSubmit} />
			)}
		</>
	)
}

export default BokingsAddEdit
