import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, message, ConfigProvider, Image, Button } from 'antd'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import { arrayMoveImmutable } from 'array-move'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import CategoryDishesDetails from './CategoryDishesDetails/CategoryDishesDetails'
import {
	getAllMenuItems,
	updateIndexMenuItems,
} from '../../../store/servicesMenuTypeItems'
import { useNavigate } from 'react-router-dom'
const URL = process.env.REACT_APP_URL

const CategoryDishesList = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [data, setData] = useState([])

	const navigate = useNavigate()

	const {
		deleteMenuItems,
		isUpdateMenuItems,
		isCreateMenuItems,
		isUpdateIndexMenuItems,
		loading,
		indexDelItem,
	} = useSelector((state) => state.settingsMenuTypeItems)

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
			dispatch(updateIndexMenuItems(newData))
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
			title: `${t('dish.titleForImage')}`,
			dataIndex: 'image',
			key: 'image',
			width: 116,
			render: (text, record) => {
				return record.image ? (
					<Image
						preview={false}
						src={`${URL}/files/${record.image.replaceAll('/', '%2F')}`}
						style={{
							width: 32,
						}}
					/>
				) : null
			},
		},
		{
			title: `${t('dish.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
		},
		{
			title: `${t('dish.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 206,
			render: (text, e) => {
				return <>${text}</>
			},
		},
		{
			title: `${t('dish.titleForStatus')}`,
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
			title: `${t('dish.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 203,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<CategoryDishesDetails record={record} />
						</Col>
						<Col>
							<Button
								style={{ padding: 0, marginLeft: 12 }}
								type='text'
								onClick={() => {
									navigate(
										`/serviceSettings/${props.name}/${props.subName}/${props.id}/${props.tax}/dish-edit/edit/${record.ID}`
									)
								}}
							>
								<img src='/assets/action/Edit.svg' alt='' />
							</Button>
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								index={record.index}
								value='dish'
								message={messageErr}
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
		if (deleteMenuItems) {
			message.success(`${t('dish.dellDishSucces')}`)
			dispatch(getAllMenuItems(props.id))
		}
		if (isUpdateMenuItems) {
			message.success({
				content: `${t('dish.updateDishSuccess')}`,
			})
			dispatch(getAllMenuItems(props.id))
		}
		if (isCreateMenuItems) {
			message.success({
				content: `${t('dish.createdDishSucces')}`,
			})
			dispatch(getAllMenuItems(props.id))
		}
		if (isUpdateIndexMenuItems) {
			message.success({
				content: `${t('dish.indexUpdateSucces')}`,
			})
		}
	}, [
		deleteMenuItems,
		isCreateMenuItems,
		isUpdateMenuItems,
		isUpdateIndexMenuItems,
	])

	useEffect(() => {
		if (props.menuItems && props.menuItems.length > 0)
			props.menuItems?.sort((a, b) => a.index - b.index)
		setData(props.menuItems)

		if (deleteMenuItems) {
			for (let i = 0; i < props.menuItems.length; i++) {
				if (props.menuItems[i].index >= indexDelItem)
					props.menuItems[i].index = props.menuItems[i].index - 1
			}
			dispatch(updateIndexMenuItems(props.menuItems, 'delete', props.id))
		}
	}, [props.menuItems])

	useEffect(() => {
		dispatch(getAllMenuItems(props.id))
	}, [props.id])

	return !loading ? (
		props.menuItems && props.menuItems.length ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : props.menuItems}
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
		<SkeletonUI data='menuItems' />
	)
}

export default CategoryDishesList
