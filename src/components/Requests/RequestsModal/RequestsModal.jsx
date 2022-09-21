import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	Row,
	Modal,
	Typography,
	Avatar,
	Steps,
	Divider,
	Badge,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import MapContainer from '../../UI Components/MapContainer/MapContainer'
import { updateRequest } from '../../../store/socket'
const { Step } = Steps
const KEY = process.env.REACT_APP_MAPS_KEY
const URL = process.env.REACT_APP_URL

const RequestsModal = (props) => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const { local } = useSelector((state) => state.local)
	const { loading } = useSelector((state) => state.socket)
	moment.locale(local.locale)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isButtonVisible, setIsButtonVisible] = useState(true)
	const [current, setCurrent] = useState(1)
	const [status, setStatus] = useState()

	useEffect(() => {
		setCurrent(
			props.record.status === 'New'
				? 1
				: props.record.status === 'Accepted'
				? 2
				: 3
		)
		props.record.status === 'Canceled' && setStatus('error')
	}, [props.record])

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const show = () => {
		setIsModalVisible(true)
	}

	const acceptButton = (current) => {
		current === 2 && setIsButtonVisible(false)
		setCurrent((prev) => prev + 1)
		const newStatus =
			(current === 1 && 'Accepted') ||
			(current === 2 && 'Completed') ||
			(status === 'error' && 'Canceled')
		const dateClick =
			(newStatus === 'Accepted' && { accepted: new Date() }) ||
			(newStatus === 'Completed' && { completed: new Date() })

		dispatch(
			updateRequest({
				ID: props.record.ID,
				status: newStatus,
				...dateClick,
			})
		)
	}

	const canceledButton = () => {
		setStatus('error')
		setIsButtonVisible(false)

		dispatch(
			updateRequest({
				ID: props.record.ID,
				status: 'Canceled',
				canceled: new Date(),
			})
		)
	}

	const confirm = () => {
		Modal.confirm({
			title: 'Are you sure cancel this request?',
			icon: <ExclamationCircleOutlined />,
			content:
				'All data will be deleted and you will not be able to recover it',
			okText: 'Yes',
			cancelText: 'No',
			onOk: () => canceledButton(),
		})
	}

	const center = {
		lat: props.record.taxiOrder?.lat,
		lng: props.record.taxiOrder?.lng,
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
						props.record.propertyService.serviceType === 'standart' ? (
							<>
								{
									<img
										src='/assets/service/cleaning.svg'
										style={{ marginRight: 14 }}
									/>
								}
								{props.record.propertyService.name}
							</>
						) : props.record.propertyService.serviceType === 'taxi' ? (
							<>
								{
									<img
										src='/assets/service/taxi.svg'
										style={{ marginRight: 14 }}
									/>
								}
								{props.record.propertyService.name}
							</>
						) : (
							<>
								{
									<img
										src='/assets/service/food.svg'
										style={{ marginRight: 14 }}
									/>
								}
								{props.record.propertyService.name}
							</>
						)
					}
					visible={isModalVisible}
					onCancel={handleCancel}
					width={572}
					bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
					footer={null}
				>
					<Row style={{ margin: '24px 0 50px' }}>
						<Col span={8}>
							<Row gutter={[, 8]}>
								<Col span={24}>
									<Typography.Text type='secondary'>Room</Typography.Text>
								</Col>
								<Col>
									<Typography.Text>
										{props.record.propertyRoom.roomNumber}
									</Typography.Text>
								</Col>
							</Row>
						</Col>
						<Col span={12}>
							<Row gutter={[, 8]}>
								<Col span={24}>
									<Typography.Text type='secondary'>Guest</Typography.Text>
								</Col>
								<Col>
									<Avatar
										icon={
											<img
												src={
													props.record.guest.avatar
														? props.record.guest.avatar
														: '/assets/OtherIcons/Admin.svg'
												}
											/>
										}
									/>
									<Typography.Text style={{ marginLeft: 14 }}>
										{`${props.record.guest.firstName} 
										${props.record.guest.lastName}`}
									</Typography.Text>
								</Col>
							</Row>
						</Col>
					</Row>
					<Steps
						size='small'
						current={(props.record.accepted && 2) || 1}
						className='step-one'
						status={(props.record.status === 'Canceled' && 'error') || status}
					>
						<Step title='New' />
						<Step
							title={
								props.record.status === 'Canceled' && !props.record.accepted
									? 'Canceled'
									: 'Accepted'
							}
						/>
						<Step
							title={
								props.record.status === 'Canceled' && props.record.accepted
									? 'Canceled'
									: 'Completed'
							}
						/>
					</Steps>
					<Row style={{ margin: '10px 0 40px' }}>
						<Col span={6}>
							<Col span={24}>
								<Typography.Text>
									{moment(props.record.created).utc(false).format('DD/MM/YYYY')}
								</Typography.Text>
							</Col>
							<Col span={24}>
								<Typography.Text>
									{moment(props.record.created).utc(false).format('HH:mm')}
								</Typography.Text>
							</Col>
						</Col>
						{(props.record.accepted || props.record.canceled) && (
							<Col span={6} offset={3} style={{ textAlign: 'center' }}>
								<Col span={24}>
									<Typography.Text>
										{moment(
											props.record.canceled
												? props.record.canceled
												: props.record.accepted
										).format('DD/MM/YYYY')}
									</Typography.Text>
								</Col>
								<Col span={24}>
									<Typography.Text>
										{moment(
											props.record.canceled
												? props.record.canceled
												: props.record.accepted
										).format('HH:mm')}
									</Typography.Text>
								</Col>
							</Col>
						)}
						{(props.record.completed ||
							(props.record.canceled && props.record.accepted)) && (
							<Col span={6} offset={3} style={{ textAlign: 'right' }}>
								<Col span={24}>
									<Typography.Text>
										{moment(
											props.record.canceled
												? props.record.canceled
												: props.record.completed
										).format('DD/MM/YYYY')}
									</Typography.Text>
								</Col>
								<Col span={24}>
									<Typography.Text>
										{moment(
											props.record.canceled
												? props.record.canceled
												: props.record.completed
										).format('HH:mm')}
									</Typography.Text>
								</Col>
							</Col>
						)}
					</Row>
					<Col span={24}>
						<Typography.Text type='secondary'>
							Request Information
						</Typography.Text>
					</Col>
					{/* dynamic data start*/}
					{props.record.propertyService.serviceType === 'standart' ? (
						<Row style={{ margin: '28px 0' }} justify='space-between'>
							<Col span={15}>
								{props.record.serviceStandarts.map((service, index) => {
									return (
										<Col
											key={index}
											style={index > 0 ? { marginTop: 14 } : null}
										>
											<Typography.Title level={5}>
												{service.name}
											</Typography.Title>
										</Col>
									)
								})}
							</Col>
							<Col span={6} style={{ textAlign: 'right' }}>
								{props.record.serviceStandarts.map((service, index) => {
									return (
										<Col
											key={index}
											style={index > 0 ? { marginTop: 14 } : null}
										>
											<Typography.Title level={5}>
												${service.price}
											</Typography.Title>
										</Col>
									)
								})}
							</Col>
						</Row>
					) : props.record.propertyService.serviceType === 'taxi' ? (
						<Row style={{ padding: '28px 0' }}>
							<MapContainer
								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${KEY}&language=${i18n.language}&v=3.exp&libraries=places,drawing,places`}
								loadingElement={<div style={{ height: '100%' }} />}
								containerElement={
									<div style={{ height: '200px', width: '100%' }} />
								}
								mapElement={<div style={{ height: '100%' }} />}
								defaultCenter={center}
								data='taxi'
							/>
							<Col span={24} style={{ marginTop: 28 }}>
								<Typography.Text>
									Location: {props.record.taxiOrder.location}
								</Typography.Text>
							</Col>
							<Col span={24} style={{ marginTop: 28 }}>
								<Typography.Text>
									Time:{' '}
									{moment(props.record.taxiOrder.time)
										? moment(props.record.taxiOrder.time).format(
												'DD.MM.YYYY HH:mm'
										  )
										: props.record.taxiOrder.time}
								</Typography.Text>
							</Col>
						</Row>
					) : (
						props.record.foodOrderHeader?.foodOrderDetails.map(
							(orderDetails) => {
								return (
									<Row
										key={orderDetails.quantity}
										style={{ margin: '28px 0' }}
										justify='space-between'
									>
										<Col span={3}>
											<Badge
												count={
													orderDetails.quantity !== 1
														? orderDetails.quantity
														: null
												}
											>
												<Avatar
													size={50}
													src={`${URL}/files/${orderDetails.menuItem.image.replaceAll(
														'/',
														'%2F'
													)}`}
												/>
											</Badge>
										</Col>
										<Col span={15}>
											<Col>
												<Typography.Title level={5}>
													{orderDetails.menuItem.name}
												</Typography.Title>
											</Col>
											{orderDetails.foodOrderAddons.map((addons) => {
												return (
													<Col key={addons.addon.name}>
														<Typography.Text type='secondary'>
															Add {addons.addon.name}
														</Typography.Text>
														<Badge
															status={
																addons.quantity !== 1 ? 'processing' : null
															}
															style={{ color: 'red', marginLeft: 5 }}
															text={
																addons.quantity !== 1
																	? `x${addons.quantity}`
																	: null
															}
														/>
													</Col>
												)
											})}
											<Col>
												<Typography.Text>
													{`Notes: 
											${orderDetails.specialNotes}`}
												</Typography.Text>
											</Col>
										</Col>
										<Col span={6} style={{ textAlign: 'right' }}>
											<Col>
												<Typography.Title level={5}>
													${orderDetails.menuItem.price}
												</Typography.Title>
											</Col>
											{orderDetails.foodOrderAddons.map((addons) => {
												return (
													<Col key={addons.addon.price}>
														<Typography.Text type='secondary'>
															+ ${addons.addon.price}
														</Typography.Text>
													</Col>
												)
											})}
										</Col>
									</Row>
								)
							}
						)
					)}
					{/* dynamic data end*/}
					{props.record.propertyService.serviceType === 'menu' ? (
						<>
							<Divider />
							<Row justify='space-between' style={{ margin: '6px 0' }}>
								<Col>
									<Typography.Text>Order</Typography.Text>
								</Col>
								<Col span={6} style={{ textAlign: 'right' }}>
									<Typography.Text>
										${props.record.foodOrderHeader?.orderTotal}
									</Typography.Text>
								</Col>
							</Row>
							<Row justify='space-between' style={{ margin: '6px 0' }}>
								<Col>
									<Typography.Text>Tips</Typography.Text>
								</Col>
								<Col span={6} style={{ textAlign: 'right' }}>
									<Typography.Text>
										${props.record.foodOrderHeader?.tipAmount}
									</Typography.Text>
								</Col>
							</Row>
							<Row justify='space-between' style={{ paddingBottom: 24 }}>
								<Col>
									<Typography.Title level={4}>Total</Typography.Title>
								</Col>
								<Col span={6} style={{ textAlign: 'right' }}>
									<Typography.Title level={4}>
										$
										{props.record.foodOrderHeader?.orderTotal +
											props.record.foodOrderHeader?.tipAmount}
									</Typography.Title>
								</Col>
							</Row>
						</>
					) : props.record.propertyService.serviceType === 'standart' ? (
						<>
							<Divider />
							<Row justify='space-between' style={{ paddingBottom: 24 }}>
								<Col>
									<Typography.Title level={4}>Total</Typography.Title>
								</Col>
								<Col span={6} style={{ textAlign: 'right' }}>
									<Typography.Title level={4}>
										$
										{props.record.serviceStandarts?.reduce(function (
											sum,
											elem
										) {
											return sum + elem.price
										},
										0)}
									</Typography.Title>
								</Col>
							</Row>
						</>
					) : null}

					{isButtonVisible && !status && current < 3 && (
						<Row align='end'>
							<Col>
								<Button danger onClick={confirm} loading={loading}>
									Cancel Request
								</Button>
							</Col>
							<Col style={{ margin: '0 0 12px 10px' }}>
								<Button
									type='primary'
									onClick={() => acceptButton(current)}
									loading={loading}
								>
									{current === 1 ? 'Accept Request' : 'Complete Request'}
								</Button>
							</Col>
						</Row>
					)}
				</Modal>
			)}
		</>
	)
}

export default RequestsModal
