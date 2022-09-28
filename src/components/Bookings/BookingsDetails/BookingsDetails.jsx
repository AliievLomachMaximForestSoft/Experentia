import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	ConfigProvider,
	DatePicker,
} from 'antd'
const { RangePicker } = DatePicker
const dateFormat = 'DD.MM.YYYY'

const BookingsDetails = (props) => {
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
		return current && current < moment().endOf('day')
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
						`${props.record.propertyRoom.roomNumber}, ${props.record.propertyRoom.roomType.name}` ||
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
							<Form
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
							>
								<Form.Item
									label={t('bookings.titleForGuest')}
									name='guest'
									style={{ marginTop: 14 }}
								>
									<Input
										defaultValue={`${props.record.guest.firstName} ${props.record.guest.lastName}`}
									/>
								</Form.Item>
								<Form.Item label={t('bookings.titleForBookingDates')}>
									<ConfigProvider locale={local}>
										<RangePicker
											disabledDate={disabledDate}
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
									</ConfigProvider>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default BookingsDetails
