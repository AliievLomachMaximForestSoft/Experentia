import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Layout, Row, Input, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ChatList } from 'react-chat-elements'
import { Content } from 'antd/es/layout/layout'
import {
	isUpdateMess_,
	setChatArrByUserId,
	setCountUnreadMess,
} from '../../store/socket'
const { Sider } = Layout

const SupportChat = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const params = useParams()
	const [newArr, setNewArr] = useState([])
	const [searchText, setSearchText] = useState()
	const [filteredArr, setFilteredArr] = useState([])
	const [clickId, setClickId] = useState()
	const { isUpdateMess, chatArrByUserId, countUnreadMess, socket } =
		useSelector((state) => state.socket)

	useEffect(() => {
		if (chatArrByUserId && (clickId || params.id)) {
			chatArrByUserId[clickId || params.id].map((elem) => {
				!elem.isReaded &&
					elem.from === elem.guest.firstName &&
					socket.emit(
						'updateMessage',
						{ ID: elem.ID, isReaded: true },
						(data) => {
							const intermediateObjForCount = { ...countUnreadMess }
							intermediateObjForCount[data.guest.ID] = 0
							const intermediateObjForChat = { ...chatArrByUserId }
							const nextIntermediateObjForChat = _.find(
								intermediateObjForChat[data.guest.ID],
								[('isReaded', false)]
							)
							if (nextIntermediateObjForChat)
								nextIntermediateObjForChat.isReaded = true
							dispatch(setChatArrByUserId(intermediateObjForChat))
							dispatch(setCountUnreadMess(intermediateObjForCount))
							dispatch(isUpdateMess_(false))
						}
					)
			})
		}
	}, [clickId, isUpdateMess])

	useEffect(() => {
		setNewArr([])
		for (const iterator in chatArrByUserId) {
			const objUserChat = {
				userId: chatArrByUserId[iterator][0].guest.ID,
				avatar: chatArrByUserId[iterator][0].guest.avatar,
				title: chatArrByUserId[iterator][0].guest.firstName,
				date: chatArrByUserId[iterator][chatArrByUserId[iterator].length - 1]
					.dateTime,
				subtitle:
					chatArrByUserId[iterator][chatArrByUserId[iterator].length - 1].text,
				unread: countUnreadMess[iterator],
			}
			setNewArr((prev) => [objUserChat, ...prev])
		}
	}, [chatArrByUserId, countUnreadMess])

	const serchUser = (value) => {
		!value && setFilteredArr([])
		value &&
			setFilteredArr(
				newArr.filter((e) => {
					return e.title.toLowerCase().startsWith(value.toLowerCase())
				})
			)
	}

	return (
		<>
			<Content>
				<Layout>
					<Sider
						width={348}
						style={{
							overflow: 'auto',
							marginLeft: '220px',
							marginTop: '48px',
							position: 'fixed',
							left: 0,
							top: 0,
							bottom: 0,
							boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
							zIndex: 2,
						}}
					>
						<Row style={{ margin: '16px 16px 0' }}>
							<Typography.Text>Chats ({newArr.length})</Typography.Text>
						</Row>

						<Input.Search
							style={{ margin: 16, width: 300 }}
							placeholder={t('supportChat.searchPlaceholderForChat')}
							allowClear
							enterButton={<SearchOutlined />}
							size='small'
							value={searchText}
							onChange={(e) => {
								setSearchText(e.target.value)
								serchUser(e.target.value)
							}}
						/>
						<ChatList
							className='chat-list'
							dataSource={
								filteredArr.length > 0
									? filteredArr.sort((a, b) => {
											return (
												new Date(b.date).getTime() - new Date(a.date).getTime()
											)
									  })
									: newArr.sort((a, b) => {
											return (
												new Date(b.date).getTime() - new Date(a.date).getTime()
											)
									  })
							}
							onClick={(e) => {
								navigate(`${e.userId}`)
								e.unread = 0
								setClickId(e.userId)
							}}
						/>
					</Sider>
					<Layout
						style={{
							marginLeft: '348px',
							backgroundColor: '#F5F5F5',
						}}
					>
						<Outlet />
					</Layout>
				</Layout>
			</Content>
		</>
	)
}

export default SupportChat
