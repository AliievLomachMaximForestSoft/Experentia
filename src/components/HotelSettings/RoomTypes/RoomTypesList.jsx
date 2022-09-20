import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, message } from 'antd'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import { arrayMoveImmutable } from 'array-move'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import { getAllRoomTypes, updateIndexRoomTypes } from '../../../store/roomTypes'
import EmptyState from '../../UI Components/EmptyState/EmptyState'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import RoomTypesEditUI from './RoomTypesEdit/RoomTypesEdit'

const RoomTypesList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const [data, setData] = useState([])

	useEffect(() => {
		dispatch(getAllRoomTypes())
	}, [])

	const {
		roomTypes,
		loading,
		deleteRoomTypes,
		isCreateRoomTypes,
		isUpdateRoomTypes,
		isUpdateIndexRoomTypes,
	} = useSelector((state) => state.roomTypes)

	const [indexDel, setIndexDel] = useState()

	useEffect(() => {
		if (isUpdateIndexRoomTypes) {
			message.success(`${t('settings.roomTypes.indexUpdateSucces')}`)
		}
	}, [isUpdateIndexRoomTypes])

	const messageErr = () => {
		message.error({
			content: `${t('settings.wifi.itemCannotBeDeleted')}`,
		})
	}

	const DragHandle = SortableHandle(() => {
		return (
			<Row align='center' style={{ cursor: 'grab' }}>
				<img src='/assets/OtherIcons/DragNdrop.svg' />
			</Row>
		)
	})

	const SortableItem = SortableElement((props) => <tr {...props} />)
	const SortableBody = SortableContainer((props) => <tbody {...props} />)
	const onSortEnd = ({ oldIndex, newIndex }) => {
		if (oldIndex !== newIndex) {
			const newData = arrayMoveImmutable(
				data.slice(),
				oldIndex,
				newIndex
			).filter((el) => !!el)
			setData(newData)
			for (let i = 0; i < newData.length; i++) {
				newData[i].index = i + 1
			}
			dispatch(updateIndexRoomTypes(newData))
		}
	}

	const DraggableContainer = (props) => (
		<SortableBody
			useDragHandle
			disableAutoscroll
			helperClass='row-dragging'
			onSortEnd={onSortEnd}
			{...props}
		/>
	)

	const DraggableBodyRow = ({ className, style, ...restProps }) => {
		if (data.length > 0) {
			const index = data.findIndex((x) => x.index === restProps['data-row-key'])
			return <SortableItem index={index} {...restProps} />
		}
	}

	const columns = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 76,
			render: () => <DragHandle />,
		},
		{
			title: `${t('settings.roomTypes.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 972,
		},
		{
			title: `${t('settings.roomTypes.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 136,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<RoomTypesEditUI record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								index={record.index}
								setIndexDel={setIndexDel}
								message={messageErr}
								value='roomTypes'
								title={`${t('settings.roomTypes.dellRoomTypesTitle')}`}
								content={`${t('settings.roomTypes.dellRoomTypesContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteRoomTypes) {
			message.success(`${t('settings.roomTypes.dellRoomTypesSucces')}`)
			dispatch(getAllRoomTypes())
		}
		if (isUpdateRoomTypes) {
			message.success({
				content: `${t('settings.roomTypes.updateRoomTypesSuccess')}`,
			})
			dispatch(getAllRoomTypes())
		}
		if (isCreateRoomTypes) {
			message.success({
				content: `${t('settings.roomTypes.createdRoomTypesSucces')}`,
			})
			dispatch(getAllRoomTypes())
		}
	}, [deleteRoomTypes, isCreateRoomTypes, isUpdateRoomTypes])

	useEffect(() => {
		if (roomTypes && roomTypes.length > 0)
			roomTypes?.sort((a, b) => a.index - b.index)
		setData(roomTypes)

		if (deleteRoomTypes) {
			for (let i = 0; i < roomTypes.length; i++) {
				if (roomTypes[i].index >= indexDel)
					roomTypes[i].index = roomTypes[i].index - 1
			}
			dispatch(updateIndexRoomTypes(roomTypes, 'delete'))
		}
	}, [roomTypes])

	return !loading ? (
		roomTypes && roomTypes.length > 0 ? (
			<Table
				pagination={false}
				columns={columns}
				dataSource={data.length > 0 ? data : roomTypes}
				rowKey={'index'}
				components={{
					body: {
						wrapper: DraggableContainer,
						row: DraggableBodyRow,
					},
				}}
			/>
		) : (
			<EmptyState columns={columns} data={null} type={'services'} />
		)
	) : (
		<SkeletonUI data='roomTypes' />
	)
}

export default RoomTypesList
