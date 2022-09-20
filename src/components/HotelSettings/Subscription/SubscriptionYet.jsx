import {
	Button,
	Card,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	List,
	Result,
	Row,
	Tag,
	Typography,
} from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { isSubscriptionUser } from '../../../store/subscription'

const SubscriptionYet = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	return (
		<Result
			className='example'
			status='warning'
			title='You are not subscribed yet'
			subTitle='Please subscribe to use this Admin Panel.'
			extra={[
				<Button
					type='primary'
					key='console'
					onClick={() => {
						props.setSetSubscription(true)
						dispatch(isSubscriptionUser(false))
					}}
				>
					Go Subscription
				</Button>,
			]}
		/>
	)
}

export default SubscriptionYet
