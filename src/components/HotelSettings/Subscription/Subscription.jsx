import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import SubscriptionContent from './SubscriptionContent'
import SubscriptionWithoutCurrent from './SubscriptionWithoutCurrent'
import {
	getSubscription,
	isSubscriptionUser,
} from '../../../store/subscription'
import { getProperty } from '../../../store/properties'
import SubscriptionYet from './SubscriptionYet'
import SubscriptionEnded from './SubscriptionEnded'

const Subscription = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [setSubscription, setSetSubscription] = useState(false)
	const { isSubscription, subscriptionDetails } = useSelector(
		(state) => state.subscription
	)
	console.log('sub')
	useEffect(() => {
		dispatch(getProperty())
		dispatch(getSubscription())
	}, [])

	useEffect(() => {
		if (subscriptionDetails)
			if (
				moment(new Date())
					.endOf('day')
					.isAfter(moment(subscriptionDetails.toDate).endOf('day')) ||
				moment(new Date())
					.endOf('day')
					.isSame(moment(subscriptionDetails.toDate).endOf('day'))
			) {
				setSetSubscription(false)
				dispatch(isSubscriptionUser(false))
				localStorage.setItem('subscription', false)
			} else {
				localStorage.setItem('subscription', true)
			}
	}, [subscriptionDetails])

	return (
		<>
			{localStorage.getItem('subscription') === 'true' && (
				<PageHeader
					title={t('settings.subscription.main')}
					breadcrumb={
						<Breadcrumb>
							<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
							<Breadcrumb.Item>
								{t('settings.subscription.main')}
							</Breadcrumb.Item>
						</Breadcrumb>
					}
				></PageHeader>
			)}
			{localStorage.getItem('subscription') === 'false' && (
				<PageHeader></PageHeader>
			)}
			<Content style={{ margin: '0 24px' }}>
				{localStorage.getItem('subscription') === 'true' && (
					<SubscriptionContent subscriptionDetails={subscriptionDetails} />
				)}
				{setSubscription &&
					!isSubscription &&
					localStorage.getItem('subscription') === 'false' && (
						<SubscriptionWithoutCurrent
							setSetSubscription={setSetSubscription}
						/>
					)}
				{isSubscription === 'first' &&
					localStorage.getItem('subscription') === 'false' && (
						<SubscriptionYet setSetSubscription={setSetSubscription} />
					)}
				{!setSubscription &&
					!isSubscription &&
					localStorage.getItem('subscription') === 'false' && (
						<SubscriptionEnded setSetSubscription={setSetSubscription} />
					)}
			</Content>
		</>
	)
}

export default Subscription
