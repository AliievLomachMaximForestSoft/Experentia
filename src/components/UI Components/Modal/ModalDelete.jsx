import React from 'react'
import { Button, Modal, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { dellService } from '../../../store/services'
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
		if (value.includes('bookings')) dispatch(dellBooking(props.id))
		else if (value.includes('roomTypes'))
			dispatch(dellRoomType(props.id, props.message))
		else if (value.includes('wifi')) dispatch(dellWiFi(props.id, props.message))
		else if (value.includes('room')) dispatch(dellRoom(props.id, props.message))
		else if (value.includes('services'))
			dispatch(dellService(props.id, props.message))
		else if (value.includes('usefulContacts'))
			dispatch(dellUsefulContact(props.id))
		else if (value.includes('addon'))
			dispatch(dellAddon(props.id, props.message))
		else if (value.includes('notifications'))
			dispatch(dellNotification(props.id))
		else if (value.includes('requests')) dispatch(dellRequest(props.id))
		else if (value.includes('menu'))
			dispatch(dellCategoryItem(props.id, props.message))
		else if (value.includes('standart'))
			dispatch(dellStandartItem(props.id, props.message))
		else if (value.includes('dish'))
			dispatch(dellMenuItem(props.id, props.message))
		else if (value.includes('attraction'))
			dispatch(dellAttraction(props.id, props.message))
		else return ''

		value.includes('Details') && navigate(-1)
		value.includes('WithIndex') && props.setIndexDel(props.index)
	}

	return (
		<>
			<Button
				style={
					props.value.includes('Details')
						? { margin: '24px 24px 0' }
						: props.value === 'sub'
						? {}
						: { padding: 0, marginLeft: 12 }
				}
				danger={props.value.includes('Details') || props.value === 'sub'}
				type={
					props.value.includes('Details') || props.value === 'sub'
						? 'default'
						: 'text'
				}
				onClick={confirm}
			>
				<Row align={'middle'}>
					{props.value !== 'sub' && (
						<img
							style={
								props.value.includes('Details')
									? { width: 14, marginRight: 10 }
									: {}
							}
							src='/assets/action/Delete.svg'
							alt='Icon'
						/>
					)}
					{props.value.includes('Details')
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
