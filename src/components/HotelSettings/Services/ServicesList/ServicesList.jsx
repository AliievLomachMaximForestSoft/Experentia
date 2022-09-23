import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
	Table,
	Row,
	Col,
	Typography,
	Button,
	message,
	ConfigProvider,
	Image,
} from 'antd'
import { arrayMoveImmutable } from 'array-move'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import SkeletonUI from '../../../UI Components/Skeleton/SkeletonUI'
import { getAllServices, updateIndexServices } from '../../../../store/services'
import EmptyState, {
	customizeRenderEmpty,
} from '../../../UI Components/EmptyState/EmptyState'
import ServicesDetails from '../ServicesDetails/ServicesDetails'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'
const URL = process.env.REACT_APP_URL
const { Text } = Typography

const ServicesList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [data, setData] = useState([])

	const {
		services,
		loading,
		deleteService,
		isCreateService,
		isUpdateService,
		isUpdateIndexServices,
		indexDelItem,
	} = useSelector((state) => state.services)
	const { local } = useSelector((state) => state.local)

	useEffect(() => {
		dispatch(getAllServices())
	}, [])

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
			dispatch(updateIndexServices(newData))
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
			width: '58px',
			render: () => <DragHandle />,
		},
		{
			title: `${t('services.titleForIcon')}`,
			dataIndex: 'icon',
			key: 'icon',
			width: '65px',
			render: (name, record) => {
				const image = record.icon.replaceAll('/', '%2F')
				return record.icon !== 'undefined' ? (
					<Image
						preview={false}
						src={`${URL}/files/${image}`}
						style={{
							width: 32,
						}}
					/>
				) : (
					<Text>
						<img src='/assets/users/avatarDefault.svg' />
					</Text>
				)
			},
		},
		{
			title: `${t('services.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 712,
		},
		{
			title: `${t('services.titleForStatus')}`,
			dataIndex: 'isActive',
			key: 'isActive',
			width: 184,
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
			title: `${t('services.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: local.locale === 'hi' ? '160px' : '150px',
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<ServicesDetails record={record} />
						</Col>
						<Col>
							<Button
								style={{ padding: 0, marginLeft: 12 }}
								type='text'
								onClick={() => {
									edit(record)
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
								value='services'
								title={`${t('services.dellServicesTitle')}`}
								content={`${t('services.dellServicesContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	const edit = (record) => {
		navigate(`/hotelSettings/services/edit/${record.ID}`)
	}

	useEffect(() => {
		if (deleteService) {
			message.success(`${t('services.dellServicesSucces')}`)
			dispatch(getAllServices())
		}
		if (isUpdateService) {
			message.success({
				content: `${t('services.updateServicesSuccess')}`,
			})
			dispatch(getAllServices())
		}
		if (isCreateService) {
			message.success({
				content: `${t('services.createdServicesSucces')}`,
			})
			dispatch(getAllServices())
		}
	}, [deleteService, isUpdateService, isCreateService])

	useEffect(() => {
		if (services.length > 0) services?.sort((a, b) => a.index - b.index)
		setData(services)

		if (deleteService) {
			for (let i = 0; i < services.length; i++) {
				if (services[i].index >= indexDelItem)
					services[i].index = services[i].index - 1
			}
			dispatch(updateIndexServices(services, 'delete'))
		}
	}, [services])

	useEffect(() => {
		if (isUpdateIndexServices) {
			message.success(`${t('services.indexUpdateSucces')}`)
		}
	}, [isUpdateIndexServices])

	return !loading ? (
		services && services.length > 0 ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table
					pagination={false}
					columns={columns}
					dataSource={data.length > 0 ? data : services}
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
			<EmptyState columns={columns} data={services} />
		)
	) : (
		<SkeletonUI data={'services'} />
	)
}

export default ServicesList
