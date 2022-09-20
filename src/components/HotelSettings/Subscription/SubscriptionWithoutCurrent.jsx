import {
	Button,
	Card,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	List,
	Row,
	Tag,
	Typography,
} from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionByRazorpay from './SubscriptionByRazorpay'
import { setSubscriptionData } from '../../../store/subscription'
import { useDispatch } from 'react-redux'

const SubscriptionWithoutCurrent = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [changeRooms, setChangeRooms] = useState()
	const [changeType, setChangeType] = useState()
	const [amount, setAmount] = useState()
	const [data, setData] = useState({})
	const [styleCard1, setStyleCard1] = useState({
		marginTop: 16,
		width: 358,
		boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
		padding: '24px 24px 0 24px',
	})
	const [styleCard2, setStyleCard2] = useState({
		marginTop: 16,
		width: 358,
		boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
		padding: '24px 24px 0 24px',
	})

	useEffect(() => {
		props.setSetSubscription(true)
	}, [])

	const dataTitle = [
		{
			title: 'Accounting of requests',
		},
		{
			title: 'Unlimited number of services',
		},
		{
			title: 'Setting up services',
		},
		{
			title: 'Quick room booking',
		},
		{
			title: 'Setting up rooms',
		},
		{
			title: 'Booking history',
		},
		{
			title: 'Support chat',
		},
	]

	const onCheck = (e) => {
		if (e === 1) {
			setChangeType(1)
			setStyleCard1({
				marginTop: 16,
				width: 358,
				boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
				padding: '24px 24px 0 24px',
				border: '1px solid #568159',
				backgroundColor: '#FAFAFA',
			})
			setStyleCard2({
				marginTop: 16,
				width: 358,
				boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
				padding: '24px 24px 0 24px',
			})
		} else {
			setChangeType(2)
			setStyleCard2({
				marginTop: 16,
				width: 358,
				boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
				padding: '24px 24px 0 24px',
				border: '1px solid #568159',
				backgroundColor: '#FAFAFA',
			})
			setStyleCard1({
				marginTop: 16,
				width: 358,
				boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
				padding: '24px 24px 0 24px',
			})
		}
	}

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	useEffect(() => {
		changeType &&
			changeRooms &&
			setAmount(
				changeType === 1 ? changeRooms * 2 * 100 : changeRooms * 12 * 100
			)
		setData({
			numberOfRooms: changeRooms,
			planType: changeType === 1 ? 'month' : 'year',
			paidAmaunt: amount,
			fromDate: new Date().toISOString(),
			toDate:
				changeType === 1
					? moment(new Date()).add(1, 'month').toISOString()
					: moment(new Date()).add(1, 'year').toISOString(),
			paidOn: new Date().toISOString(),
		})
	}, [changeRooms, changeType])

	const sendDataSubscription = (data) => {
		dispatch(setSubscriptionData(data))
	}
	return (
		<>
			<Form>
				<Row justify='space-between'>
					<Col>
						<Form.Item {...config} label='Number of rooms:'>
							<InputNumber max={100} min={1} onChange={setChangeRooms} />
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<SubscriptionByRazorpay
								changeRooms={changeRooms}
								changeType={changeType}
								amount={amount}
								sendDataSubscription={sendDataSubscription}
								data={data}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Row justify='center' gutter={[24, 0]}>
				<Col>
					<Card hoverable style={styleCard1} onClick={() => onCheck(1)}>
						<Typography.Title level={3}>1 Month</Typography.Title>
						<Row align='bottom' gutter={[5, 0]}>
							<Col
								style={{
									marginTop: 16,
								}}
							>
								<Typography.Title level={2}>$ 2 </Typography.Title>
							</Col>
							<Col
								style={{
									marginTop: 16,
								}}
							>
								<Typography.Title level={4}> / room / month</Typography.Title>
							</Col>
						</Row>

						<Divider
							style={{
								margin: '40px 0',
							}}
						/>
						<List
							style={{ paddingBottom: 0 }}
							itemLayout='horizontal'
							dataSource={dataTitle}
							renderItem={(item) => (
								<List.Item style={{ padding: 6 }}>
									<List.Item.Meta
										title={item.title}
										avatar={<CheckCircleTwoTone twoToneColor='#52c41a' />}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				<Col>
					<Card hoverable onClick={() => onCheck(2)} style={styleCard2}>
						<Typography.Title level={3}>1 Year</Typography.Title>
						<Row align='bottom' gutter={[5, 0]}>
							<Col
								style={{
									marginTop: 16,
								}}
							>
								<Typography.Title level={2}>$ 1 </Typography.Title>
							</Col>
							<Col
								style={{
									marginTop: 16,
								}}
							>
								<Typography.Title level={4}> / room / month</Typography.Title>
							</Col>
						</Row>
						<Divider
							style={{
								margin: '40px 0',
							}}
						/>
						<List
							style={{ paddingBottom: 0 }}
							itemLayout='horizontal'
							dataSource={dataTitle}
							renderItem={(item) => (
								<List.Item style={{ padding: 6 }}>
									<List.Item.Meta
										title={item.title}
										avatar={<CheckCircleTwoTone twoToneColor='#52c41a' />}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default SubscriptionWithoutCurrent
