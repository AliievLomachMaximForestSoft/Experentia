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
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import { updateIndexMenuItems } from '../../../store/servicesMenuTypeItems'
import { useNavigate } from 'react-router-dom'
import ModalDelete from '../../UI Components/Modal/ModalDelete'

import AttractionsDetails from './AttractionsDetails/AttractionsDetails'
import {
	getAllAttractions,
	updateIndexAttractionIndex,
} from '../../../store/servicesAttractions'
const URL = process.env.REACT_APP_URL

const AttractionsList = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [data, setData] = useState([])

	const navigate = useNavigate()

	const {
		deleteAttractions,
		isUpdateAttractions,
		isCreateAttractions,
		isUpdateIndexAttractions,
		loading,
		indexDelItem,
	} = useSelector((state) => state.settingsAttractionsType)

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
			dispatch(updateIndexAttractionIndex(newData))
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
			width: 70,
			render: () => <DragHandle />,
		},

		{
			title: `${t('dish.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 1000,
		},
		{
			title: `${t('dish.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 150,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<AttractionsDetails record={record} />
						</Col>
						<Col>
							<Button
								style={{ padding: 0, marginLeft: 12 }}
								type='text'
								onClick={() => {
									navigate(
										`/serviceSettings/${props.name}/${record.name}/${record.ID}/attraction/edit`
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
								message={messageErr}
								value='attraction'
								title={`${t('attractions.dellAttractionTitle')}`}
								content={`${t('attractions.dellAttractionContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteAttractions) {
			message.success(`${t('attractions.dellAttractionSucces')}`)
			dispatch(getAllAttractions(props.id))
		}
		if (isUpdateAttractions) {
			message.success({
				content: `${t('attractions.updateAttractionSuccess')}`,
			})
			dispatch(getAllAttractions(props.id))
		}
		if (isCreateAttractions) {
			message.success({
				content: `${t('attractions.createdAttractionSucces')}`,
			})
			dispatch(getAllAttractions(props.id))
		}
		if (isUpdateIndexAttractions) {
			message.success({
				content: `${t('attractions.indexUpdateSucces')}`,
			})
		}
	}, [
		deleteAttractions,
		isCreateAttractions,
		isUpdateAttractions,
		isUpdateIndexAttractions,
	])

	useEffect(() => {
		if (props.attractions && props.attractions.length > 0)
			props.attractions?.sort((a, b) => a.index - b.index)
		setData(props.attractions)

		if (deleteAttractions) {
			for (let i = 0; i < props.attractions.length; i++) {
				if (props.attractions[i].index >= indexDelItem)
					props.attractions[i].index = props.attractions[i].index - 1
			}
			dispatch(
				updateIndexAttractionIndex(props.attractions, 'delete', props.id)
			)
		}
	}, [props.attractions])

	// useEffect(() => {
	// 	if (isUpdateIndexAttractions) {
	// 		message.success(`${t('services.indexUpdateSucces')}`)
	// 	}
	// }, [isUpdateIndexAttractions])

	useEffect(() => {
		dispatch(getAllAttractions(props.id))
	}, [props.id])

	return !loading ? (
		props.attractions && props.attractions.length ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : props.attractions}
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
		<SkeletonUI data='attractions' />
	)
}

export default AttractionsList
