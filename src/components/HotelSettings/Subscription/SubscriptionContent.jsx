import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Button, Card, Col, Row, Tag, Typography } from 'antd'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import { useSelector } from 'react-redux'

const SubscriptionContent = (props) => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)

	return (
		<>
			<Typography.Title level={2}>Your current subscription</Typography.Title>
			<Card
				style={{
					marginTop: 16,
					width: '100%',
					boxShadow: '0px 4px 4px rgba(194, 194, 194, 0.25)',
					padding: 24,
				}}
			>
				<Typography.Title level={3}>
					{`${
						props.subscriptionDetails.planType === 'month' ? '1Month' : '1Year'
					}`}
					: ${props.subscriptionDetails.paidAmaunt}
				</Typography.Title>
				<Typography.Text>
					{props.subscriptionDetails.numberOfRooms} rooms
				</Typography.Text>
				<Row justify='space-between' style={{ marginTop: 14 }} align='middle'>
					<Col>
						<Tag color='green'>Active</Tag>
						<Typography.Text>
							Next bill date{' '}
							{moment(props.subscriptionDetails.toDate).format('DD.MM.YYYY')}
						</Typography.Text>
					</Col>
					<Col>
						<ModalDelete
							title={t('settings.subscription.dellSubTitle')}
							content={t('settings.subscription.dellSubContent')}
							value='sub'
						/>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export default SubscriptionContent
