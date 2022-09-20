import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	ConfigProvider,
	DatePicker,
	Select,
	Avatar,
} from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
import UploadFile from '../../UI Components/UploadFile/UploadFile'
const { RangePicker } = DatePicker
const dateFormat = 'DD.MM.YYYY'
const URL = process.env.REACT_APP_URL

const BookingHistoryDetails = (props) => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const show = () => {
		setIsModalVisible(true)
	}

	const disabledDate = (current) => {
		return current && current
	}

	return (
		<>
			<Button
				style={{ padding: 0, marginLeft: 12 }}
				type='text'
				onClick={() => {
					props.show ? props.show(props.record) : show()
				}}
			>
				<img src='/assets/action/Eye.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={
						`${props.record.propertyRoom.roomNumber}, ${props.record.propertyRoom.roomType}` ||
						'undefined'
					}
					visible={isModalVisible}
					onCancel={handleCancel}
					width={572}
					bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
					footer={null}
				>
					<Row>
						<Col span={24}>
							<ConfigProvider locale={local}>
								<Form
									colon={true}
									name='basic'
									initialValues={{ remember: true }}
									autoComplete='off'
									layout='vertical'
									requiredMark={false}
								>
									<Form.Item label={t('bookings.titleForGuest')}>
										<Input
											prefix={
												<Avatar
													style={{ marginRight: 10 }}
													size={22}
													src={props.record.guest.avatar}
												/>
											}
											placeholder={t('bookings.placeholderForPhoneNumber')}
											defaultValue={`${props.record.guest.firstName} ${props.record.guest.lastName}`}
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
													moment(props.record.fromDate) < moment(),
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
													moment(props.record.fromDate),

													moment(props.record.toDate),
												]}
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
											defaultValue={props.record.propertyRoom.accomodationType}
										>
											<Select.Option
												value={props.record.propertyRoom.accomodationType}
											>
												{props.record.propertyRoom.accomodationType}
											</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item
										label={t('bookings.titleForRoomType')}
										name='roomType'
									>
										<Select
											name='roomType'
											placeholder={t('bookings.placeholderForBookingSelect')}
											allowClear
											defaultValue={props.record.propertyRoom.roomType.name}
										>
											<Select.Option
												value={props.record.propertyRoom.roomType.name}
											>
												{props.record.propertyRoom.roomType.name}
											</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item
										label={t('bookings.titleForRoomNumber')}
										name='roomNumber'
									>
										<Select
											name='roomNumber'
											placeholder={t('bookings.placeholderForBookingSelect')}
											allowClear
											defaultValue={props.record.propertyRoom.roomNumber}
										>
											<Select.Option
												value={props.record.propertyRoom.roomNumber}
											>
												{props.record.propertyRoom.roomNumber}
											</Select.Option>
										</Select>
									</Form.Item>
									<Form.Item
										label={t('bookings.invoce')}
										name='invoce'
										rules={[
											{
												required: true,
											},
										]}
									>
										<UploadFile
											url={
												props.record.file !== 'undefined'
													? `${URL}/files/${props.record?.file?.replaceAll(
															'/',
															'%2F'
													  )}`
													: ''
											}
											record={props.record}
										/>
									</Form.Item>
								</Form>
							</ConfigProvider>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default BookingHistoryDetails
