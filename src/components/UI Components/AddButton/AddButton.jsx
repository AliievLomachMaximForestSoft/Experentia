import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Button, Row, Col, notification } from 'antd'

const AddButton = (props) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { subscriptionDetails } = useSelector((state) => state.subscription)
	const { rooms } = useSelector((state) => state.rooms)

	return (
		<Button
			type={
				props.data === 'rooms' &&
				rooms.items &&
				rooms.meta.totalItems >= subscriptionDetails.numberOfRooms
					? 'default'
					: 'primary'
			}
			danger={
				props.data === 'rooms' &&
				rooms.items &&
				rooms.meta.totalItems >= subscriptionDetails.numberOfRooms
			}
			onClick={() =>
				props.data === 'rooms' &&
				rooms.items &&
				rooms.meta.totalItems >= subscriptionDetails.numberOfRooms
					? notification.error({
							message: `${t('settings.rooms.maximumRooms')}`,
					  })
					: props.navigate
					? navigate(props.navigate)
					: ''
			}
		>
			<Row align='middle' style={{ padding: 0 }}>
				<Col>
					{props.data === 'services' ||
					props.data === 'dish' ||
					props.data === 'rooms' ||
					props.data === 'notifications' ||
					props.data === 'attraction' ? (
						''
					) : (
						<img
							src='/assets/button/Add.svg'
							style={{ verticalAlign: 'baseline', paddingTop: '4.5px' }}
						/>
					)}
				</Col>
				<Col>
					{props.data === 'services' ? (
						`${t('header.addButtonService')}`
					) : props.data === 'rooms' ? (
						`${t('settings.rooms.newCategory')}`
					) : props.data === 'notifications' ? (
						`${t('notifications.newNotifications')}`
					) : props.data === 'dish' ? (
						`${t('dish.newDish')}`
					) : props.data === 'attraction' ? (
						`${t('attractions.newAttraction')}`
					) : (
						<p
							style={{
								display: 'inline',
								lineHeight: 0,
								margin: 0,
								padding: 0,
								paddingLeft: 10,
							}}
						>
							{t('header.addButtonBoockings')}{' '}
						</p>
					)}
				</Col>
			</Row>
		</Button>
	)
}

export default AddButton
