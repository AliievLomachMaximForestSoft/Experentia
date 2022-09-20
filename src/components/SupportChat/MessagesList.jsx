import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { List, Typography, Card, Row, Divider, Tag } from 'antd'
// import MessageBox from './MessageBox'
import { MessageBox } from 'react-chat-elements'

const MessagesList = (props) => {
	const widthStyle = window.innerWidth - 680
	const { local } = useSelector((state) => state.local)
	moment.locale(local.locale)

	const styleForTag = {
		backgroundColor: '#D9D9D9',
		color: 'white',
		borderRadius: '12px',
	}

	const getPrevDate = (item) => {
		for (let i = props.newArr.indexOf(item); i < props.newArr.length; i++) {
			if (
				props.newArr[i - 1] &&
				moment(props.newArr[i - 1].dateTime)
					.endOf('day')
					.isBefore(moment(props.newArr[i].dateTime).endOf('day'))
			) {
				return moment(new Date())
					.subtract(1, 'day')
					.endOf('day')
					.isSame(moment(item.dateTime).endOf('day')) ? (
					<Divider>
						<Tag style={styleForTag}>Yesterday</Tag>
					</Divider>
				) : moment(new Date())
						.endOf('day')
						.isAfter(moment(item.dateTime).endOf('day')) ? (
					<Divider>
						<Tag style={styleForTag}>
							{moment(item.dateTime).endOf('day').format('DD.MM.YYYY')}
						</Tag>
					</Divider>
				) : moment(new Date())
						.endOf('day')
						.isSame(moment(item.dateTime).endOf('day')) ? (
					<Divider>
						<Tag style={styleForTag}>Today</Tag>
					</Divider>
				) : null
			} else break
		}
	}
	return (
		<List
			style={{ padding: 0 }}
			dataSource={props.newArr}
			renderItem={(item) => (
				<>
					{getPrevDate(item)}
					{item.from === item.guest.firstName && (
						<MessageBox
							titleColor='#568159'
							title={item.from}
							type={'text'}
							text={item.text}
							date={item.dateTime}
							position={'left'}
						/>
						// <Row>
						// 	<List.Item>
						// 		<Card
						// 			style={{
						// 				maxWidth: widthStyle,
						// 				minWidth: 150,
						// 				backgroundColor: 'white',
						// 				margin: '0px 24px',
						// 				borderRadius: '16px 16px 16px 0px',
						// 				boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
						// 			}}
						// 		>
						// 			<>
						// 				<Typography.Title level={5}>{item.text}</Typography.Title>
						// 				<Row align='end'>
						// 					<Typography.Text level={5} style={{ color: '#3B6C43' }}>
						// 						{moment(new Date())
						// 							.subtract(1, 'day')
						// 							.endOf('day')
						// 							.isSame(moment(item.dateTime).endOf('day'))
						// 							? `yesterday ${moment(item.dateTime).format('HH:mm')}`
						// 							: moment(new Date())
						// 									.endOf('day')
						// 									.isAfter(moment(item.dateTime).endOf('day'))
						// 							? moment(item.dateTime).format('DD.MM HH:mm')
						// 							: moment(item.dateTime).format('HH:mm')}
						// 					</Typography.Text>
						// 				</Row>
						// 			</>
						// 		</Card>
						// 	</List.Item>
						// </Row>
					)}
					{/* {item.from !== item.guest.firstName && <MessageBox item={item} />} */}
					{item.from !== item.guest.firstName && (
						<MessageBox
							titleColor='#568159'
							title={item.from}
							position={'right'}
							type={'text'}
							text={item.text}
							date={item.dateTime}
							status={
								item.isReaded
									? 'read'
									: item.isDelivered
									? 'received'
									: item.isSended
									? 'sent'
									: 'waiting'
							}
						/>
					)}
				</>
			)}
		/>
	)
}

export default MessagesList
