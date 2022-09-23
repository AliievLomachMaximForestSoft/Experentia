import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import moment from 'moment'
import { Menu, Badge, Row, Col, notification } from 'antd'
import SideBarIcon from '../UI Components/Icons/SideBarIcon'
import { getAllServices } from '../../store/services'
import {
	getAllMess,
	getAllRequests,
	isUpdateMess_,
	setChatArrByUserId,
	setCountUnreadMess,
} from '../../store/socket'
import { setStatus } from '../../store/login'

function getItem(label, key, icon, children, type) {
	if (label === 'Service Settings' && children.length === 0) {
		return null
	}
	return { key, icon, children, label, type }
}

const Sider = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [badgeCountForRequest, setBadgeCountForRequest] = useState()
	const [badgeCountForMess, setBadgeCountForMess] = useState()

	const { services } = useSelector((state) => state.services)
	const { requests, socket, chatArrByUserId, countUnreadMess, allMess } =
		useSelector((state) => state.socket)

	const [newRequests, setNewRequests] = useState()

	useEffect(() => {
		dispatch(getAllMess())
	}, [])

	useEffect(() => {
		if (allMess) {
			const arrUserMess = {}
			const unreadMess = {}
			allMess.items.forEach((elem) => {
				if (!arrUserMess[elem.guest.ID]) {
					arrUserMess[elem.guest.ID] = [elem]

					if (elem.from === elem.guest.firstName && !elem.isReaded) {
						unreadMess[elem.guest.ID] = 1
					} else {
						unreadMess[elem.guest.ID] = 0
					}
				} else {
					arrUserMess[elem.guest.ID].unshift(elem)
					if (elem.from === elem.guest.firstName && !elem.isReaded) {
						unreadMess[elem.guest.ID] += 1
					}
				}
			})
			dispatch(setCountUnreadMess(unreadMess))
			dispatch(setChatArrByUserId(arrUserMess))
		}
	}, [allMess])

	socket &&
		socket.on('createServiceOrder', (data) => {
			setNewRequests(data)
		})
	socket &&
		socket.on('error', (data) => {
			dispatch(setStatus(data.status))
		})
	socket &&
		socket.on('exception', (data) => {
			dispatch(setStatus(data.status))
		})
	socket &&
		socket.on('createMessage', (data) => {
			if (data.message.from === data.message.guest.firstName) {
				socket.emit('updateMessage', {
					ID: data.message.ID,
					isDelivered: true,
				})
				data.message.isDelivered = true
				dispatch(isUpdateMess_(true))
				if (chatArrByUserId !== null) {
					if (chatArrByUserId[data.message.guest.ID]) {
						const intermediateObjForChat = { ...chatArrByUserId }
						intermediateObjForChat[data.message.guest.ID] = [
							...chatArrByUserId[data.message.guest.ID],
							data.message,
						]
						const intermediateObjForCount = { ...countUnreadMess }
						intermediateObjForCount[data.message.guest.ID] += 1
						dispatch(setCountUnreadMess(intermediateObjForCount))
						dispatch(setChatArrByUserId(intermediateObjForChat))
					} else {
						const intermediateObjForChat = {
							...chatArrByUserId,
							[data.message.guest.ID]: [data.message],
						}
						dispatch(setChatArrByUserId(intermediateObjForChat))
					}
				}
			}
		})
	// socket &&
	// 	socket.on('updateMessage', (data) => {
	// 		if (chatArrByUserId !== null) {
	// 			const intermediateObjForChat = { ...chatArrByUserId }
	// 			intermediateObjForChat[data.message.guest.ID][data.message.ID] =
	// 				data.message
	// 			dispatch(setChatArrByUserId(intermediateObjForChat))
	// 			dispatch(isUpdateMess_(true))
	// 		}
	// 	})

	useEffect(() => {
		dispatch(getAllServices())
		dispatch(getAllRequests())
	}, [newRequests])

	const location = useLocation()

	const [activeTab, setActiveTab] = useState(
		location.pathname === '/' ? '/' : location.pathname.slice(1)
	)

	const navigateTo = (item) => {
		if (item.key === '/') {
			setActiveTab('/')
			navigate(`${item.key}`)
		} else {
			navigate(`/${item.key}`)
			setActiveTab(item.key)
		}
	}

	useEffect(() => {
		setBadgeCountForRequest(_.filter(requests.items, ['status', 'New']))
		if (newRequests) {
			const x = _.find(requests.items, ['ID', newRequests.guestServiceOrder.ID])
			const time = moment(x.created).utc(false).format('DD.MM.YYYY HH:mm')
			notification.warning({
				message: time,
				description: `You have a new request from the ${x.propertyService.name} service`,
				duration: 0,
			})
			setNewRequests()
		}
	}, [requests])

	useEffect(() => {
		setBadgeCountForMess(
			Object.values(countUnreadMess).reduce((acc, value) => {
				return acc + value
			}, 0)
		)
	}, [countUnreadMess])

	const items = [
		getItem(
			` ${t('sidebar.Bookings')}`,
			'/',
			<SideBarIcon name={activeTab !== '/' ? 'Bookings' : 'BookingsActive'} />
		),
		getItem(
			<Row>
				<Col span={18}>{t('sidebar.Requests')}</Col>
				<Col>{<Badge count={badgeCountForRequest?.length} />}</Col>
			</Row>,
			'requests',
			<SideBarIcon
				name={activeTab !== 'requests' ? 'Requests' : 'RequestsActive'}
			/>
		),
		getItem(
			<Row>
				<Col span={18}>{t('sidebar.SupportChat')}</Col>
				<Col>
					<Badge count={badgeCountForMess} />
				</Col>
			</Row>,
			'supportChat',
			<SideBarIcon
				name={
					activeTab.includes('supportChat')
						? 'SupportChatActive'
						: 'SupportChat'
				}
			/>
		),

		getItem(
			`${t('sidebar.ServiceSettings')}`,
			'serviceSettings',
			<SideBarIcon
				name={
					activeTab !== 'serviceSettings'
						? 'ServiceSettings'
						: 'ServiceSettingsActive'
				}
			/>,

			services &&
				services.map((service) => {
					if (service.serviceType !== 'taxi') {
						return getItem(
							`${service.name}`,
							`serviceSettings/${service.serviceType}/${service.name}/${service.ID}/${service.tax}`
						)
					}
				})
		),
		getItem(
			`${t('sidebar.Notifications')}`,
			'notifications',
			<SideBarIcon
				name={
					activeTab !== 'notifications'
						? 'Notifications'
						: 'NotificationsActive'
				}
			/>
		),
		getItem(
			`${t('sidebar.BookingHistory')}`,
			'bookingHistory',
			<SideBarIcon
				name={
					activeTab !== 'bookingHistory'
						? 'BookingHistory'
						: 'BookingHistoryActive'
				}
			/>
		),
		getItem(
			`${t('sidebar.HotelSettings')}`,
			'hotelSettings',
			<SideBarIcon
				name={
					activeTab !== 'hotelSettings'
						? 'HotelSettings'
						: 'HotelSettingsActive'
				}
			/>,
			[
				getItem(`${t('sidebar.about')}`, 'hotelSettings/about'),
				getItem(`${t('sidebar.services')}`, 'hotelSettings/services'),
				getItem(`${t('sidebar.roomTypes')}`, 'hotelSettings/roomTypes'),
				getItem(`${t('sidebar.rooms')}`, 'hotelSettings/rooms'),
				getItem(`${t('sidebar.wiFi')}`, 'hotelSettings/wiFi'),
				getItem(
					`${t('sidebar.usefulContacts')}`,
					'hotelSettings/usefulContacts'
				),
				getItem(`${t('sidebar.addons')}`, 'hotelSettings/addons'),
				getItem(`${t('sidebar.subscription')}`, 'hotelSettings/subscription'),
			]
		),
		// getItem(
		// 	`${t('sidebar.HowToUse')}`,
		// 	'howToUse',
		// 	<SideBarIcon
		// 		name={activeTab !== 'howToUse' ? 'HowToUse' : 'HowToUseActive'}
		// 	/>
		// ),
	]

	return (
		<Menu
			onClick={(e) => navigateTo(e)}
			defaultSelectedKeys={[activeTab]}
			mode='inline'
			theme='light'
			items={items}
		/>
	)
}

export default Sider
