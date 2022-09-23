import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, message, ConfigProvider, Typography } from 'antd'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import { arrayMoveImmutable } from 'array-move'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'

import StandartEdit from './StandartEdit/StandartEdit'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import {
	getAllStandartItems,
	updateIndexStandartItems,
} from '../../../store/servicesStandartType'

const StandartList = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [data, setData] = useState([])
	const [indexDel, setIndexDel] = useState()

	const {
		deleteStandartItems,
		isUpdateStandartItems,
		isCreateStandartItems,
		isUpdateIndexStandartItems,
		loading,
	} = useSelector((state) => state.settingStandartType)

	const messageErr = () => {
		message.error({
			content: `${t('settings.addons.itemCannotBeDeleted')}`,
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
			dispatch(updateIndexStandartItems(newData))
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
			title: `${t('standart.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
		},
		{
			title: `${t('standart.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 116,
			render: (text) => {
				return <>${text}</>
			},
		},
		{
			title: `${t('standart.titleForStatus')}`,
			dataIndex: 'status',
			key: 'status',
			width: 206,
			render: (text, e) => {
				return e.isActive ? (
					<>
						<img style={{ marginRight: 12 }} src='/assets/status/green.svg' />
						Active
					</>
				) : (
					<>
						<img style={{ marginRight: 12 }} src='/assets/status/red.svg' />
						Not Active
					</>
				)
			},
		},
		{
			title: `${t('standart.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 143,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<StandartEdit record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								index={record.index}
								setIndexDel={setIndexDel}
								message={messageErr}
								value='standart'
								title={`${t('standart.dellStandartTitle')}`}
								content={`${t('standart.dellStandartContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteStandartItems) {
			message.success(`${t('standart.dellStandartSucces')}`)
			dispatch(getAllStandartItems(props.id))
		}
		if (isUpdateStandartItems) {
			message.success({
				content: `${t('standart.updateStandartSuccess')}`,
			})
			dispatch(getAllStandartItems(props.id))
		}
		if (isCreateStandartItems) {
			message.success({
				content: `${t('standart.createdStandartSucces')}`,
			})
			dispatch(getAllStandartItems(props.id))
		}
		if (isUpdateIndexStandartItems) {
			message.success({
				content: `${t('standart.indexUpdateSucces')}`,
			})
		}
	}, [
		deleteStandartItems,
		isCreateStandartItems,
		isUpdateStandartItems,
		isUpdateIndexStandartItems,
	])

	useEffect(() => {
		if (props.standartItems && props.standartItems.length > 0)
			props.standartItems?.sort((a, b) => a.index - b.index)
		setData(props.standartItems)

		if (deleteStandartItems) {
			for (let i = 0; i < props.standartItems.length; i++) {
				if (props.standartItems[i].index >= indexDel)
					props.standartItems[i].index = props.standartItems[i].index - 1
			}
			dispatch(
				updateIndexStandartItems(props.standartItems, 'delete', props.id)
			)
		}
	}, [props.standartItems])

	useEffect(() => {
		dispatch(getAllStandartItems(props.id))
	}, [props.id])

	return !loading ? (
		props.standartItems && props.standartItems.length ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : props.standartItems}
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
			<EmptyState columns={columns} data={[]} type={'services'} />
		)
	) : (
		<SkeletonUI data='servicesStandart' />
	)
}

export default StandartList
