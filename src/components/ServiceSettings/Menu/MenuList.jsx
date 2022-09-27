import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, Button, message, ConfigProvider } from 'antd'
import { arrayMoveImmutable } from 'array-move'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import {
	getAllCategoryItems,
	updateIndexCategoryIndex,
} from '../../../store/servicesMenuType'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import MenuDetails from './MenuDetails/MenuDetails'

const MenuList = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [data, setData] = useState([])
	const [indexDel, setIndexDel] = useState()

	const {
		categoryItems,
		loading,
		isUpdateIndexCategoryItems,
		isUpdateCategoryItems,
		isCreateCategoryItems,
		deleteCategoryItems,
	} = useSelector((state) => state.settingsMenuType)

	const DragHandle = SortableHandle(() => {
		return (
			<Row align='center' style={{ cursor: 'grab' }}>
				<img src='/assets/OtherIcons/DragNdrop.svg' />
			</Row>
		)
	})

	console.log('categoryItems :>> ', categoryItems)
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
			dispatch(updateIndexCategoryIndex(newData))
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

	const messageErr = () => {
		message.error({
			content: `${t('menu.itemCannotBeDeleted')}`,
		})
	}
	useEffect(() => {
		if (deleteCategoryItems) {
			message.success(`${t('menu.dellCategorySucces')}`)
			dispatch(getAllCategoryItems(props.id))
		}
		if (isUpdateCategoryItems) {
			message.success({
				content: `${t('menu.updateCategorySuccess')}`,
			})
			dispatch(getAllCategoryItems(props.id))
		}
		if (isCreateCategoryItems) {
			message.success({
				content: `${t('menu.createdCategorySucces')}`,
			})
			dispatch(getAllCategoryItems(props.id))
		}
		if (isUpdateIndexCategoryItems) {
			message.success(`${t('menu.indexUpdateSucces')}`)
		}
	}, [
		deleteCategoryItems,
		isUpdateCategoryItems,
		isCreateCategoryItems,
		isUpdateIndexCategoryItems,
	])

	const columns = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 77,
			render: () => <DragHandle />,
		},
		{
			title: `${t('menu.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 779,
		},
		{
			title: `${t('menu.titleForStatus')}`,
			dataIndex: 'isActive',
			key: 'isActive',
			width: 233,
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
			title: `${t('menu.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 206,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<MenuDetails record={record} />
						</Col>
						<Col>
							<Button
								style={{ padding: 0, marginLeft: 12 }}
								type='text'
								onClick={() => {
									navigate(
										`/serviceSettings/${props.name}/${record.name}/${record.ID}/${props.tax}/items`
									)
								}}
							>
								<img src='/assets/action/Dish.svg' alt='' />
							</Button>
						</Col>
						<Col>
							<ModalDelete
								setIndexDel={setIndexDel}
								id={record.ID}
								index={record.index}
								value='menuWithIndex'
								title={`${t('menu.dellCategoryTitle')}`}
								content={`${t('menu.dellCategoryContent')}`}
								message={messageErr}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (categoryItems && categoryItems.length > 0)
			categoryItems?.sort((a, b) => a.index - b.index)
		setData(categoryItems)

		if (deleteCategoryItems) {
			for (let i = 0; i < categoryItems.length; i++) {
				if (categoryItems[i].index >= indexDel)
					categoryItems[i].index = categoryItems[i].index - 1
			}
			dispatch(updateIndexCategoryIndex(categoryItems, 'delete', props.id))
		}
	}, [categoryItems])

	return !loading ? (
		categoryItems && categoryItems.length ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : categoryItems}
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
		<SkeletonUI data={'servicesMenu'} />
	)
}

export default MenuList
