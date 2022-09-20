import React from 'react'
import moment from 'moment'
import { List, Typography, Card, Row } from 'antd'

const MessageBox = ({ item }) => {
	const widthStyle = window.innerWidth - 680

	return (
		<Row align='end'>
			<List.Item>
				<Card
					style={{
						maxWidth: widthStyle,
						minWidth: 150,
						margin: '0px 24px',
						borderRadius: '16px 16px 0px 16px',
						boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
						background: '#FEF7D9',
					}}
				>
					<>
						<Typography.Title level={5}>{item.text}</Typography.Title>
						<Row align='end'>
							<Typography.Text level={5} style={{ color: '#3B6C43' }}>
								{moment(new Date())
									.subtract(1, 'day')
									.endOf('day')
									.isSame(moment(item.dateTime).endOf('day'))
									? `yesterday ${moment(item.dateTime).format('HH:mm')}`
									: moment(new Date())
											.endOf('day')
											.isAfter(moment(item.dateTime).endOf('day'))
									? moment(item.dateTime).format('DD.MM HH:mm')
									: moment(item.dateTime).format('HH:mm')}
							</Typography.Text>
							<Typography.Title level={5} style={{ marginLeft: 10 }}>
								{item.isReaded && (
									<img src='/assets/OtherIcons/sendedMessage.svg' alt='' />
								)}

								{item.isDelivered && !item.isReaded && (
									<img src='/assets/OtherIcons/sendMessage.svg' alt='' />
								)}
							</Typography.Title>
						</Row>
					</>
				</Card>
			</List.Item>
		</Row>
	)
}

export default MessageBox
