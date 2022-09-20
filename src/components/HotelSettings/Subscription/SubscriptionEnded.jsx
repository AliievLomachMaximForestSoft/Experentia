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

const SubscriptionEnded = (props) => {
	const { t } = useTranslation()
	return (
		<Result
			className='example'
			status='error'
			title='Usage suspended'
			subTitle='Please update your subscription.'
			extra={[
				<Button
					type='primary'
					key='console'
					onClick={() => props.setSetSubscription(true)}
				>
					Go Subscription
				</Button>,
			]}
		/>
	)
}

export default SubscriptionEnded
