import React from 'react'
import { Button, Modal, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { dellService, indexDelItemService } from '../../../store/services'
import { dellBooking } from '../../../store/bookings'
import { dellRoomType } from '../../../store/roomTypes'
import { dellWiFi } from '../../../store/wifi'
import { dellRoom } from '../../../store/rooms'
import { dellUsefulContact } from '../../../store/usefulContacts'
import { dellAddon } from '../../../store/addons'
import { dellNotification } from '../../../store/notification'
import { dellCategoryItem } from '../../../store/servicesMenuType'
import { dellStandartItem } from '../../../store/servicesStandartType'
import { dellMenuItem } from '../../../store/servicesMenuTypeItems'
import { dellAttraction } from '../../../store/servicesAttractions'
import { dellRequest } from '../../../store/socket'
import { indexDelItem } from '../../../store/categoryDishes'

const ModalDelete = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const confirm = () => {
		Modal.confirm({
			title: props.title,
			content: props.content,
			okText: `${t('modal.okDell')}`,
			cancelText: `${t('modal.cancelDell')}`,
			onOk: () => handleOk(props.value),
			autoFocusButton: null,
			okButtonProps: { loading: props.deleteService },
		})
	}

	const handleOk = (value) => {
		if (
			value === 'bookings' ||
			value === 'bookingsDetails' ||
			value === 'bookingsHistory'
		) {
			dispatch(dellBooking(props.id))

			value === !'bookingsHistory' && navigate('/')
		} else if (value === 'roomTypes') {
			dispatch(dellRoomType(props.id, props.message))
			props.setIndexDel(props.index)
		} else if (value === 'wifi') {
			dispatch(dellWiFi(props.id, props.message))
		} else if (value === 'room' || value === 'roomDetails') {
			dispatch(dellRoom(props.id, props.message))
			navigate('/hotelSettings/rooms')
		} else if (value === 'sub') {
		} else if (value === 'services' || value === 'servicesDetails') {
			dispatch(dellService(props.id, props.message))
			dispatch(indexDelItemService(props.index))
			navigate('/hotelSettings/services')
		} else if (value === 'admins') {
			props.delAdmin(props.record)
		} else if (value === 'usefulContacts') {
			dispatch(dellUsefulContact(props.id))
			props.setIndexDel(props.index)
		} else if (value === 'addon') {
			dispatch(dellAddon(props.id, props.message))
		} else if (value === 'notifications') {
			dispatch(dellNotification(props.id))
		} else if (value === 'requests') {
			dispatch(dellRequest(props.id))
		} else if (value === 'menu') {
			dispatch(dellCategoryItem(props.id, props.message))
			props.setIndexDel(props.index)
		} else if (value === 'standart') {
			props.setIndexDel(props.index)
			dispatch(dellStandartItem(props.id, props.message))
		} else if (value === 'dish' || value === 'dishDetails') {
			dispatch(dellMenuItem(props.id, props.message))
			dispatch(indexDelItem(props.index))
			value === 'dishDetails' && navigate(-1)
		} else if (value === 'attraction' || value === 'attractionDetails') {
			props.setIndexDel(props.index)
			dispatch(dellAttraction(props.id, props.message))
		} else {
			return ''
		}
	}

	return (
		<>
			<Button
				style={
					props.value === 'servicesDetails' ||
					props.value === 'propertyDatails' ||
					props.value === 'bookingsDetails' ||
					props.value === 'roomDetails' ||
					props.value === 'dishDetails'
						? { margin: '24px 24px 0' }
						: props.value === 'sub'
						? {}
						: { padding: 0, marginLeft: 12 }
				}
				danger={
					props.value === 'servicesDetails' ||
					props.value === 'propertyDatails' ||
					props.value === 'bookingsDetails' ||
					props.value === 'sub' ||
					props.value === 'roomDetails' ||
					props.value === 'dishDetails'
						? true
						: false
				}
				type={
					props.value === 'servicesDetails' ||
					props.value === 'propertyDatails' ||
					props.value === 'bookingsDetails' ||
					props.value === 'sub' ||
					props.value === 'roomDetails' ||
					props.value === 'dishDetails'
						? 'default'
						: 'text'
				}
				onClick={confirm}
			>
				<Row align={'middle'}>
					{props.value !== 'sub' && (
						<img
							style={
								props.value === 'servicesDetails' ||
								props.value === 'propertyDatails' ||
								props.value === 'bookingsDetails' ||
								props.value === 'roomDetails' ||
								props.value === 'dishDetails'
									? { width: 14, marginRight: 10 }
									: {}
							}
							src='/assets/action/Delete.svg'
							alt='Icon'
						/>
					)}
					{props.value === 'servicesDetails' ||
					props.value === 'propertyDatails' ||
					props.value === 'bookingsDetails' ||
					props.value === 'roomDetails' ||
					props.value === 'dishDetails'
						? `${t('button.titleForDell')}`
						: props.value === 'sub'
						? `${t('settings.subscription.cancelSubscription')}`
						: ''}
				</Row>
			</Button>
		</>
	)
}

export default ModalDelete
