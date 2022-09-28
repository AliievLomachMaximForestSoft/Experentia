import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	ConfigProvider,
	DatePicker,
	Avatar,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import { getAllRooms } from '../../../store/rooms'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import 'moment/locale/es-us'
import 'moment/locale/hi'
const { RangePicker } = DatePicker
const dateFormat = 'DD.MM.YYYY'

const BookingsEditUI = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [inOutDate, setInOutDate] = useState([])

	const { local } = useSelector((state) => state.local)
	const { rooms } = useSelector((state) => state.rooms)

	useEffect(() => {
		props.setBookingsDetails(props.bookingsDetails)
		dispatch(getAllRooms())
	}, [])

	const onFinish = () => {
		const fromDate = inOutDate[0].toISOString()
		const toDate = inOutDate[1].toISOString()
		const newData = {
			fromDate: fromDate,
			toDate: toDate,
			guest: props.bookingsDetails.guest,
			propertyRoom: props.bookingsDetails.propertyRoom,
		}

		props.onSubmit(newData)
	}

	const disabledDate = (current) => {
		return current && current < moment().endOf('day')
	}

	return (
		<Content style={{ backgroundColor: '#F5F5F5' }}>
			<Content
				style={{ position: 'relative', margin: 24, backgroundColor: 'white' }}
			>
				<Row style={{ position: 'absolute', right: '15px', top: '10px' }}>
					{props.bookingsDetails ? (
						<ModalDelete
							id={props.id}
							value={'bookingsDetails'}
							title={`${t('bookings.dellBookingTitle')}`}
							content={`${t('bookings.dellBookingContent')}`}
						/>
					) : null}
				</Row>
				<Row style={{ padding: '24px 0 24px 0' }}>
					<Col span={10} offset={7}>
						<ConfigProvider locale={local}>
							<Form
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={onFinish}
								requiredMark={false}
							>
								<Form.Item label={t('bookings.titleForGuest')}>
									<Input
										prefix={
											<Avatar
												style={{ marginRight: 10 }}
												size={22}
												src={props.bookingsDetails.guest.avatar}
											/>
										}
										placeholder={t('bookings.placeholderForPhoneNumber')}
										defaultValue={`${props.bookingsDetails.guest.firstName} ${props.bookingsDetails.guest.lastName}`}
									/>
								</Form.Item>
								<ConfigProvider locale={local}>
									<Form.Item
										label={t('bookings.titleForPhoneBookingDates')}
										name='bookingDates'
										hasFeedback
										rules={[
											{
												type: 'array',
												required: true,
											},
										]}
									>
										<RangePicker
											disabledDate={disabledDate}
											disabled={[
												moment(props.bookingsDetails.fromDate) < moment(),
												false,
											]}
											placeholder={[
												`${t('bookings.placeholderForPhoneBookingDatesIn')}`,

												`${t('bookings.placeholderForPhoneBookingDatesOut')}`,
											]}
											style={{
												width: '100%',
											}}
											key={1}
											format={dateFormat}
											defaultValue={[
												moment(props.bookingsDetails.fromDate),

												moment(props.bookingsDetails.toDate),
											]}
											onChange={(e) => setInOutDate(e)}
										/>
									</Form.Item>
								</ConfigProvider>
								<Form.Item
									label={t('bookings.titleForAccommodationType')}
									name='accommodationType'
								>
									<Select
										name='accommodationType'
										placeholder={t('bookings.placeholderForBookingSelect')}
										allowClear
										defaultValue={
											props.bookingsDetails.propertyRoom.accomodationType
										}
									>
										<Select.Option
											value={
												props.bookingsDetails.propertyRoom.accomodationType
											}
										>
											{props.bookingsDetails.propertyRoom.accomodationType}
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomType')}
									name='roomType'
								>
									{rooms?.items?.map((room) => {
										if (room.ID === props.bookingsDetails.propertyRoom.ID) {
											return (
												<Select
													key={room.ID}
													name='roomType'
													placeholder={t(
														'bookings.placeholderForBookingSelect'
													)}
													allowClear
													defaultValue={room.roomType.name}
												>
													<Select.Option value={room.roomType.name}>
														{room.roomType.name}
													</Select.Option>
												</Select>
											)
										}
									})}
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomNumber')}
									name='roomNumber'
								>
									<Select
										name='roomNumber'
										placeholder={t('bookings.placeholderForBookingSelect')}
										allowClear
										defaultValue={props.bookingsDetails.propertyRoom.roomNumber}
									>
										<Select.Option
											value={props.bookingsDetails.propertyRoom.roomNumber}
										>
											{props.bookingsDetails.propertyRoom.roomNumber}
										</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item>
									<Row align='end'>
										<Button
											htmlType='submit'
											type='primary'
											style={{ marginLeft: 12 }}
										>{`${t('bookings.saveText')}`}</Button>
									</Row>
								</Form.Item>
							</Form>
						</ConfigProvider>
					</Col>
				</Row>
			</Content>
		</Content>
	)
}

export default BookingsEditUI
