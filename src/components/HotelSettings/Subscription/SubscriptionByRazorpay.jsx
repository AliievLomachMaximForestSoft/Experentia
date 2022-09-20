import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import useRazorpay from 'react-razorpay'
import { useSelector } from 'react-redux'

const SubscriptionByRazorpay = (props) => {
	const { t } = useTranslation()
	const { property } = useSelector((state) => state.properties)

	const Razorpay = useRazorpay()

	const handlePayment = useCallback(
		async (amount, data) => {
			data.paidAmaunt = amount / 100
			const options = {
				key: 'rzp_test_ajZTs3PigeQSE2',
				amount: amount,
				currency: 'USD',
				name: 'Experentia Corp',
				description: 'Test Transaction',
				image: `logo.svg`,
				handler: () => {
					localStorage.setItem('subscription', true)
					props.sendDataSubscription(data)
				},
				prefill: {
					name: property.name,
					email: property.email,
					contact: property.phone,
				},
				notes: {
					address: property.address.fullAddress,
				},
				theme: {
					color: '#568159',
				},
			}

			const rzpay = new Razorpay(options)
			rzpay.on('payment.failed', function (response) {
				console.log(response.error.description)
			})
			rzpay.open()
		},
		[Razorpay]
	)

	return (
		property && (
			<Button
				disabled={!props.changeRooms || !props.changeType}
				type='primary'
				onClick={() => handlePayment(props.amount, props.data)}
			>
				Continue
			</Button>
		)
	)
}

export default SubscriptionByRazorpay
