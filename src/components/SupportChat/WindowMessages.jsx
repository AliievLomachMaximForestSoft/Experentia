import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	PageHeader,
	Row,
	Col,
	Avatar,
	Input,
	Typography,
	Button,
	Form,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import MessagesList from './MessagesList'
import UsersDetails from '../UI Components/UserDetails/UserDetails'
import { setChatArrByUserId } from '../../store/socket'
const { Title } = Typography

const WindowMessages = () => {
	const params = useParams()
	const { t } = useTranslation()

	const [form] = Form.useForm()
	useEffect(() => {}, [params])
	const [mess, setMess] = useState()
	const [messages, setMessages] = useState([])
	const widthStyle = window.innerWidth - 580
	const hStyle = window.innerHeight - 280
	const { allMess, chatArrByUserId, socket } = useSelector(
		(state) => state.socket
	)
	const { nameAdmin } = useSelector((state) => state.properties)

	const dispatch = useDispatch()

	const finish = (e) => {
		setMess(e.mess)
		socket &&
			socket.emit(
				'createMessage',
				{
					dateTime: new Date(),
					from: `Administrator: ${nameAdmin}`,
					text: e.mess,
					guest: { ID: chatArrByUserId[params.id][0].guest.ID },
					propertyRoom: { ID: chatArrByUserId[params.id][0].propertyRoom.ID },
				},
				(data) => {
					const x = { ...chatArrByUserId }
					x[params.id] = [...chatArrByUserId[params.id], data]
					dispatch(setChatArrByUserId(x))
				}
			)
		form.resetFields()
	}

	useEffect(() => {
		setMessages([])
		chatArrByUserId &&
			chatArrByUserId[params.id].map((elem) => {
				setMessages((prev) => [...prev, elem])
			})
	}, [params.id, allMess, chatArrByUserId])

	socket &&
		socket.on('updateMessage', (data) => {
			console.log('data', data)

			if (chatArrByUserId) {
				const intermediateObjForChat = { ...chatArrByUserId }
				intermediateObjForChat[data.message.guest.ID].map((elem, index) => {
					if (elem.ID === data.message.ID)
						intermediateObjForChat[data.message.guest.ID][index] = data.message
				})
				setMessages(intermediateObjForChat[data.message.guest.ID])
			}
		})

	useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight)
	}, [messages])

	return (
		chatArrByUserId && (
			<>
				<Content
					style={{
						backgroundColor: '#f5f5f5',
						position: 'fixed',
						left: 568,
						top: 48,
						minWidth: widthStyle,
						zIndex: 1,
					}}
				>
					<PageHeader
						avatar={{
							size: 44,
							icon: (
								<Avatar
									size={44}
									src={chatArrByUserId[params.id][0].guest.avatar}
								/>
							),
						}}
						title={
							<>
								<Title level={5}>
									{chatArrByUserId[params.id][0].guest.firstName}
								</Title>
								<Title type='secondary' level={5}>
									{`
									${chatArrByUserId[params.id][0].propertyRoom.roomNumber}, 
									${chatArrByUserId[params.id][0].propertyRoom.roomType.name}`}
								</Title>
							</>
						}
						extra={
							<UsersDetails record={chatArrByUserId[params.id][0].guest} />
						}
						style={{
							backgroundColor: 'white',
							margin: '16px 24px',
							padding: '4px 16px',
							borderRadius: 4,
							boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
						}}
					/>
				</Content>
				<Content
					style={{
						marginTop: 93,
						marginBottom: 80,
						minHeight: hStyle,
					}}
				>
					<MessagesList mess={mess} newArr={messages} />
				</Content>
				<Content
					style={{
						backgroundColor: '#f5f5f5',
						position: 'fixed',
						left: 568,
						bottom: 0,
						width: widthStyle,
					}}
				>
					<PageHeader
						style={{
							backgroundColor: 'white',
							margin: '16px 24px',
							padding: 0,
							borderRadius: 4,
							boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
						}}
					>
						<Form
							colon={true}
							form={form}
							name='basic'
							initialValues={{ remember: true }}
							autoComplete='off'
							layout='vertical'
							onFinish={finish}
						>
							<Row justify='space-between'>
								<Col span={23}>
									<Form.Item name='mess' style={{ margin: 0 }}>
										<Input
											name='mess'
											style={{
												margin: 0,
												padding: 8,
												border: 'none',
												width: '100%',
												boxShadow: 'none',
											}}
											placeholder={t('supportChat.writeMessage')}
										/>
									</Form.Item>
								</Col>
								<Col span={1}>
									<Form.Item style={{ margin: 0 }}>
										<Button
											type='text'
											htmlType='submit'
											style={{
												padding: 0,
												height: 24,
											}}
										>
											<img src='/assets/action/Send.svg' alt='' />
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</PageHeader>
				</Content>
			</>
		)
	)
}

export default WindowMessages
