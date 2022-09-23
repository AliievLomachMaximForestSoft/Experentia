import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Card, Col, Row, Tag, Typography } from 'antd'
import ModalDelete from '../../UI Components/Modal/ModalDelete'

const SubscriptionContent = (props) => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)

	return (
		<>
			<Typography.Title level={2}>
				{t('settings.subscription.currentSubscription')}
			</Typography.Title>
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
						props.subscriptionDetails.planType === 'month'
							? `1 ${t('settings.subscription.Month')}`
							: `1 $${t('settings.subscription.Year')}`
					}`}
					: ${props.subscriptionDetails.paidAmaunt}
				</Typography.Title>
				<Typography.Text>
					{props.subscriptionDetails.numberOfRooms}{' '}
					{t('settings.subscription.rooms')}
				</Typography.Text>
				<Row justify='space-between' style={{ marginTop: 14 }} align='middle'>
					<Col>
						<Tag color='green'>{t('settings.subscription.Active')}</Tag>
						<Typography.Text>
							{`${t('settings.subscription.NextBillDate')}: `}
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
