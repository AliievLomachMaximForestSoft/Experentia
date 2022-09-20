import { Col, ConfigProvider, message, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	getAllUsefulContacts,
	updateIndexUsefulContacts,
} from '../../../store/usefulContacts'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import { useDispatch, useSelector } from 'react-redux'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import UsefulContactsEdit from './UsefulContactsEdit/UsefulContactsEdit'

const UsefulContactsList = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [indexDel, setIndexDel] = useState()
	const {
		usefulContacts,
		loading,
		deleteUsefulContacts,
		isCreateUsefulContacts,
		isUpdateUsefulContacts,
		isUpdateIndexUsefulContacts,
	} = useSelector((state) => state.usefulContacts)

	useEffect(() => {
		dispatch(getAllUsefulContacts())
	}, [])

	useEffect(() => {
		if (isUpdateIndexUsefulContacts) {
			message.success(`${t('settings.usefulContacts.indexUpdateSucces')}`)
		}
	}, [isUpdateIndexUsefulContacts])

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
			dispatch(updateIndexUsefulContacts(newData))
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

	useEffect(() => {
		if (deleteUsefulContacts) {
			message.success(`${t('settings.usefulContacts.dellUsefulContactSucces')}`)
			dispatch(getAllUsefulContacts())
		}
		if (isUpdateUsefulContacts) {
			message.success({
				content: `${t('settings.usefulContacts.updateUsefulContactSuccess')}`,
			})
			dispatch(getAllUsefulContacts())
		}
		if (isCreateUsefulContacts) {
			message.success({
				content: `${t('settings.usefulContacts.createdUsefulContactSucces')}`,
			})
			dispatch(getAllUsefulContacts())
		}
	}, [deleteUsefulContacts, isCreateUsefulContacts, isUpdateUsefulContacts])

	useEffect(() => {
		if (usefulContacts && usefulContacts.length > 0)
			usefulContacts?.sort((a, b) => a.index - b.index)
		setData(usefulContacts)

		if (deleteUsefulContacts) {
			for (let i = 0; i < usefulContacts.length; i++) {
				if (usefulContacts[i].index >= indexDel)
					usefulContacts[i].index = usefulContacts[i].index - 1
			}
			dispatch(updateIndexUsefulContacts(usefulContacts, 'delete'))
		}
	}, [usefulContacts])

	const columns = [
		{
			dataIndex: 'index',
			key: 'index',
			width: 74,
			render: () => <DragHandle />,
		},
		{
			title: `${t('settings.usefulContacts.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 524,
		},
		{
			title: `${t('settings.usefulContacts.titleForPhoneNumber')}`,
			dataIndex: 'phone',
			key: 'phone',
			width: 524,
		},
		{
			title: `${t('settings.usefulContacts.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 136,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<UsefulContactsEdit record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								index={record.index}
								setIndexDel={setIndexDel}
								value='usefulContacts'
								title={`${t('settings.usefulContacts.dellUsefulContactTitle')}`}
								content={`${t(
									'settings.usefulContacts.dellUsefulContactContent'
								)}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	return !loading ? (
		usefulContacts && usefulContacts.length > 0 ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : usefulContacts}
					rowKey={'index'}
					components={{
						body: {
							wrapper: DraggableContainer,
							row: DraggableBodyRow,
						},
					}}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} type={'services'} />
		)
	) : (
		<SkeletonUI data='usefulContacts' />
	)
}

export default UsefulContactsList
