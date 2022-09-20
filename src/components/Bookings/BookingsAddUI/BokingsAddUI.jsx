import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	message,
	ConfigProvider,
	Avatar,
	DatePicker,
	AutoComplete,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import { getUsersByPhone } from '../../../store/users'
import moment from 'moment'
import 'moment/locale/es-us'
import 'moment/locale/hi'
import { getAllRoomTypes } from '../../../store/roomTypes'
import { getAllRooms, getAllRoomsWithBookings } from '../../../store/rooms'
const { Text } = Typography
const { RangePicker } = DatePicker
const dateFormat = 'DD.MM.YYYY'
const { Option } = AutoComplete

const BokingsAddUI = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [form] = Form.useForm()

	const [value, setValue] = useState()
	const [options, setOptions] = useState([])
	const [result, setResult] = useState([])
	const [inOutDate, setInOutDate] = useState([])
	const [accType, setAccType] = useState()
	const [roomTypeFiltered, setRoomTypeFiltered] = useState()
	const [roomsFiltered, setRoomsFiltered] = useState()
	const [selectedRoomType, setSelectedRoomType] = useState()

	const [isSearchVisible, setIsSearchVisible] = useState(true)
	const [isInputVisible, setIsInputVisible] = useState(false)

	const { usersSearch } = useSelector((state) => state.users)
	const { loading } = useSelector((state) => state.bookings)
	const { local } = useSelector((state) => state.local)
	const { roomTypes } = useSelector((state) => state.roomTypes)
	const { roomsWithBookings, rooms } = useSelector((state) => state.rooms)

	useEffect(() => {
		dispatch(getAllRoomsWithBookings())
		dispatch(getAllRooms())
		dispatch(getAllRoomTypes())
	}, [])

	const handleSearch = (value) => {
		setOptions(value ? getResult(value) : [])
	}

	const handleSelect = (e) => {
		usersSearch.map((user) => {
			if (user.phone === e) setValue(user)
		})
	}

	const getResult = (value) => {
		setResult([])
		dispatch(getUsersByPhone(value.replace(/\D/g, '')))
		setResult(usersSearch)
	}

	useEffect(() => {
		if (usersSearch) {
			setResult(usersSearch)
		}
	}, [usersSearch])

	const showInput = () => {
		setIsInputVisible(true)
		setIsSearchVisible(false)
	}

	const showSelect = () => {
		setIsInputVisible(false)
		setIsSearchVisible(true)
	}

	const onFinish = (e) => {
		const number = _.find(rooms.items, ['roomNumber', e.roomNumber])
		const date1 = new Date(inOutDate[0])
		const date2 = new Date(inOutDate[1])
		const fromDate = date1.toISOString()
		const toDate = date2.toISOString()
		if (value) {
			const newData = {
				fromDate: fromDate,
				toDate: toDate,
				guest: value,
				propertyRoom: number,
			}

			props.onSubmit(newData)
		} else message.error('Chose guest')
	}

	const selectData = (e) => {
		setInOutDate(e)
	}
	useEffect(() => {
		if (inOutDate) filterRoomsByData()
	}, [inOutDate])

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	const disabledDate = (current) => {
		return current && current < moment().endOf('day').subtract(1, 'day')
	}

	const filterRoomsByData = () => {
		const date1 = new Date(inOutDate[0])
		const date2 = new Date(inOutDate[1])

		const dateArray = []
		const diapason = (startDate, endDate, steps = 1) => {
			let currentDate = new Date(startDate)

			while (currentDate <= new Date(endDate)) {
				dateArray.push(new Date(currentDate))
				currentDate.setUTCDate(currentDate.getUTCDate() + steps)
			}
			return dateArray
		}
		diapason(date1, date2)
		let delRoom = new Set()

		roomsWithBookings.length > 0 &&
			roomsWithBookings.map((room) => {
				room.bookings.map((dates) => {
					dateArray.map((el) => {
						if (
							moment(dates.fromDate).isSame(moment(el), 'day') ||
							moment(dates.toDate).isSame(moment(el), 'day')
						) {
							roomsWithBookings.filter((elem) => {
								return room === elem ? delRoom.add(elem) : ''
							})
						}
					})
				})
			})
		const x = []

		roomsWithBookings.length > 0 &&
			roomsWithBookings.map((room) => {
				return !delRoom.has(room) ? x.push(room) : ''
			})
		setRoomsFiltered(x)
		roomTypeFilter(x)
	}

	const roomTypeFilter = (data) => {
		if (accType) {
			const type = []
			data.map((room) => {
				if (room.accomodationType === accType) type.push(room)
			})
			const newRoom = []
			const newRoomType = new Set()
			roomTypes.map((elem) => {
				type.map((el) => {
					if (elem.name === el.roomType.name) {
						newRoom.push(el)
						newRoomType.add(elem)
					}
				})
			})
			setRoomsFiltered(newRoom)

			const x = []

			roomTypes.length > 0 &&
				roomTypes.map((room) => {
					return newRoomType.has(room) ? x.push(room) : ''
				})
			filterRoomsByRoomType(newRoom)
			setRoomTypeFiltered(x)
		}
	}

	const filterRoomsByRoomType = (data) => {
		if (selectedRoomType) {
			const newRoom = []
			data.map((room) => {
				if (room.roomType.name === selectedRoomType) newRoom.push(room)
			})

			setRoomsFiltered(newRoom)
			form.setFieldsValue({ roomNumber: undefined })
		}
	}

	useEffect(() => {
		if (accType || selectedRoomType) filterRoomsByData()
	}, [accType, selectedRoomType])

	return rooms.items?.length > 0 ? (
		<Content style={{ backgroundColor: '#F5F5F5' }}>
			<Content style={{ margin: 24, backgroundColor: 'white' }}>
				<Row style={{ padding: '24px 0 24px 0' }}>
					<Col span={10} offset={7}>
						<ConfigProvider locale={local}>
							<Form
								form={form}
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={onFinish}
								requiredMark={false}
							>
								<Form.Item
									label={t('bookings.titleForGuest')}
									validateStatus={!value ? 'error' : 'success'}
									help={!value ? 'Chose guest' : null}
								>
									{isSearchVisible ? (
										<AutoComplete
											placeholder={t('bookings.placeholderForPhoneNumber')}
											options={options}
											defaultValue={value?.phone}
											autoFocus={true}
											onBlur={() => showInput()}
											onSearch={(e) => {
												handleSearch(e)
											}}
											onSelect={(e) => handleSelect(e)}
											filterOption={(input, option) =>
												option.children.props.children[0].props.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
											notFoundContent={t('bookings.NoResults')}
										>
											{!loading &&
												result &&
												result.map((value) => (
													<Option key={value.phone} value={value.phone}>
														<Row justify='space-between'>
															<Text>{value.phone}</Text>
															<Text>
																{`${value.firstName} ${value.lastName}`}
															</Text>
															<Avatar size={22} src={value?.avatar} />
														</Row>
													</Option>
												))}
										</AutoComplete>
									) : null}
									{isInputVisible ? (
										<Input
											// prefix={
											// 	isInputVisible ? (
											// 		<Avatar
											// 			style={{ marginRight: 10 }}
											// 			size={22}
											// 			src={value?.avatar}
											// 		/>
											// 	) : null
											// }
											placeholder={t('bookings.placeholderForPhoneNumber')}
											defaultValue={
												value ? `${value.firstName} ${value.lastName}` : null
											}
											onFocus={() => {
												showSelect()
											}}
										/>
									) : null}
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
											placeholder={[
												`${t('bookings.placeholderForPhoneBookingDatesIn')}`,

												`${t('bookings.placeholderForPhoneBookingDatesOut')}`,
											]}
											style={{
												width: '100%',
											}}
											key={1}
											format={dateFormat}
											onChange={(e) => {
												selectData(e)
												form.setFieldsValue({
													roomNumber: undefined,
													roomType: undefined,
												})
											}}
										/>
									</Form.Item>
								</ConfigProvider>
								<Form.Item
									label={t('bookings.titleForAccommodationType')}
									name='accommodationType'
									{...config}
								>
									<Select
										name='accommodationType'
										placeholder={t('bookings.placeholderForBookingSelect')}
										allowClear
										onSelect={(e) => {
											setAccType(e)
											form.setFieldsValue({
												roomNumber: undefined,
												roomType: undefined,
											})
										}}
									>
										<Select.Option value='SGL (Single)'>
											SGL (Single)
										</Select.Option>
										<Select.Option value='DBL (Double)'>
											DBL (Double)
										</Select.Option>
										<Select.Option value='TRPL (Triple)'>
											TRPL (Triple)
										</Select.Option>
										<Select.Option value='QDPL (Quadriple)'>
											QDPL (Quadriple)
										</Select.Option>
										<Select.Option value='ExB (Extra Bed)'>
											ExB (Extra Bed)
										</Select.Option>
										<Select.Option value='ROH (Run of the house)'>
											ROH (Run of the house)
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomType')}
									name='roomType'
									validateStatus={
										roomTypeFiltered &&
										roomTypeFiltered.length === 0 &&
										'warning'
									}
									{...config}
								>
									<Select
										name='roomType'
										placeholder={t('bookings.placeholderForBookingSelect')}
										allowClear
										onSelect={(e) => {
											setSelectedRoomType(e)
										}}
									>
										{roomTypeFiltered
											? roomTypeFiltered.map((type) => {
													return (
														<Select.Option key={type.name} value={type.name}>
															{type.name}
														</Select.Option>
													)
											  })
											: roomTypes &&
											  roomTypes.map((type) => {
													return (
														<Select.Option key={type.name} value={type.name}>
															{type.name}
														</Select.Option>
													)
											  })}
									</Select>
								</Form.Item>
								<Form.Item
									label={t('bookings.titleForRoomNumber')}
									name='roomNumber'
									validateStatus={
										roomsFiltered && roomsFiltered.length === 0 && 'warning'
									}
									{...config}
								>
									<Select
										name='roomNumber'
										placeholder={t('bookings.placeholderForBookingSelect')}
										allowClear
									>
										{roomsFiltered
											? roomsFiltered.map((room) => {
													return (
														<Select.Option
															key={room.roomNumber}
															value={room.roomNumber}
														>
															{room.roomNumber}
														</Select.Option>
													)
											  })
											: rooms.items.map((room) => {
													return (
														<Select.Option
															key={room.roomNumber}
															value={room.roomNumber}
														>
															{room.roomNumber}
														</Select.Option>
													)
											  })}
									</Select>
								</Form.Item>

								<Form.Item>
									<Row align='end'>
										<Button
											loading={loading}
											htmlType='submit'
											type='primary'
											style={{ marginLeft: 12 }}
										>{`${t('bookings.Book')}`}</Button>
									</Row>
								</Form.Item>
							</Form>
						</ConfigProvider>
					</Col>
				</Row>
			</Content>
		</Content>
	) : null
}

export default BokingsAddUI
