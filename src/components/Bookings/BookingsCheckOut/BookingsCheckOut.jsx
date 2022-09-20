import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
	Col,
	Form,
	Input,
	Row,
	Modal,
	Button,
	Avatar,
	DatePicker,
	ConfigProvider,
	message,
} from 'antd'
import moment from 'moment'
import UploadFile from '../../UI Components/UploadFile/UploadFile'
import 'moment/locale/es-us'
import 'moment/locale/hi'
import { sendPDFFile, updateBooking } from '../../../store/bookings'
const { RangePicker } = DatePicker
const dateFormat = 'DD.MM.YYYY'

const BookingsCheckOut = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	const { pdfUrl, loadingPdf, isUploadPdf, loading } = useSelector(
		(state) => state.bookings
	)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fileList, setFileList] = useState()
	const [id, setId] = useState()

	const uploadFile = (file, id) => {
		setFileList(file)
		setId(id)
	}

	const onChange = () => {
		fileList
			? dispatch(sendPDFFile(fileList))
			: message.warning('Add pls pdf file')
	}
	useEffect(() => {
		if (isUploadPdf && id && props.record.ID === id) {
			const newData = { file: pdfUrl }
			newData.ID = props.record.ID
			newData.fileName = fileList.name
			dispatch(updateBooking(newData, pdfUrl))
			setIsModalVisible(false)
		}
	}, [isUploadPdf])

	return (
		<>
			<Button
				style={{ padding: 0 }}
				type='text'
				onClick={() => {
					setIsModalVisible(true)
				}}
			>
				<img src='/assets/action/CheckOut.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={
						`${props.record.propertyRoom.roomNumber}, ${props.record.propertyRoom.roomType.name}` ||
						'undefined'
					}
					visible={isModalVisible}
					width={572}
					bodyStyle={{ paddingBottom: 0 }}
					footer={null}
					onCancel={() => setIsModalVisible(false)}
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
								<Form.Item label={t('bookings.titleForName')}>
									<Input
										prefix={
											<Avatar
												src={props.record.guest.avatar}
												style={{ marginRight: 10 }}
											/>
										}
										defaultValue={`${props.record.guest.firstName} ${props.record.guest.lastName}`}
									/>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForPhoneBookingDates')}
									name='bookingDates'
								>
									<ConfigProvider locale={local}>
										<RangePicker
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
								<Form.Item
									label={t('bookings.titleForAccommodationType')}
									name='accommodationType'
								>
									<Input
										placeholder='Unknown'
										defaultValue={props.record.propertyRoom.accomodationType}
									/>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomType')}
									name='roomType'
								>
									<Input
										key={props.record.propertyRoom.roomType.name}
										placeholder='Unknown'
										defaultValue={`${props.record.propertyRoom.roomType.name}`}
									/>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomNumber')}
									name='roomNumber'
								>
									<Input
										placeholder='Unknown'
										defaultValue={props.record.propertyRoom.roomNumber}
									/>
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
									<UploadFile record={props.record} onChange={uploadFile} />
								</Form.Item>

								<Form.Item>
									<Row align='end'>
										<Button onClick={() => setIsModalVisible(false)}>{`${t(
											'modal.cancelText'
										)}`}</Button>
										<Button
											onClick={onChange}
											loading={loadingPdf || loading}
											type='primary'
											style={{ marginLeft: 12 }}
										>{`${t('modal.checkOut')}`}</Button>
									</Row>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default BookingsCheckOut
