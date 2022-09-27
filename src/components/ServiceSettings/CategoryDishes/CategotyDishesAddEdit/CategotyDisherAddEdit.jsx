import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	PageHeader,
	Breadcrumb,
	Row,
	Col,
	Input,
	Form,
	Button,
	Select,
	Checkbox,
	InputNumber,
	AutoComplete,
	Table,
	ConfigProvider,
	Typography,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import UploadIcon from '../../../UI Components/UploadImage/UploadIcon'
import TextArea from 'antd/lib/input/TextArea'
import {
	sendIcon,
	updateMenuItem,
} from '../../../../store/servicesMenuTypeItems'
import { filterAddons, getAllAddons } from '../../../../store/addons'
import EmptyState, {
	customizeRenderEmpty,
} from '../../../UI Components/EmptyState/EmptyState'
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
} from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'
const { Text } = Typography

const { Option } = AutoComplete
const URL = process.env.REACT_APP_URL

const CategoryDishesAddEdit = (props) => {
	const { tax } = useParams()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [img, setImg] = useState(null)
	const [fields, setFields] = useState([])
	const [data, setData] = useState([])
	const [value, setValue] = useState('')
	const { name, subName, type, id, itemid } = useParams()
	const [index, setIndex] = useState(null)
	const [icon, setIcon] = useState('undefined')
	const [taxCount, setTaxCount] = useState()

	const { menuItems, isUpdateMenuItems, isCreateMenuItems, loading } =
		useSelector((state) => state.settingsMenuTypeItems)

	const { addonsFiltered } = useSelector((state) => state.addons)

	const addEdit = type === 'add' ? 'New Dish' : type

	const { local } = useSelector((state) => state.local)

	useEffect(() => {
		if (isUpdateMenuItems || isCreateMenuItems) {
			navigate(-1)
		}
	}, [isCreateMenuItems, isUpdateMenuItems])

	useEffect(() => {
		dispatch(getAllAddons())

		if (type === 'add') {
			setIcon('undefined')
			setImg(null)

			setFields([
				{
					name: ['isActive'],
					value: true,
				},
				{
					name: ['isVegetarian'],
					value: false,
				},
			])
		}
		if (type === 'edit') {
			menuItems.map((item) => {
				setTaxCount(item.tax)
				if (item.ID === Number(itemid)) {
					if (item.image !== null) setIcon(item.image)
					setIndex(item.index)
					setData(item?.menuItemAddons?.length ? item.menuItemAddons : [])
					setFields([
						{
							name: ['name'],
							value: item?.name || '',
						},
						{
							name: ['description'],
							value: item?.description || '',
						},
						{
							name: ['isVegetarian'],
							value: item?.isVegetarian || false,
						},
						{
							name: ['price'],
							value: item?.price || null,
						},
						{
							name: ['isActive'],
							value: item?.isActive || true,
						},
					])
				}
			})
		}
	}, [isCreateMenuItems, isUpdateMenuItems])

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	const onSubmit = (e) => {
		if (type === 'add') {
			const newData = {
				...e,
				tax: taxCount,
				index: menuItems.length ? menuItems.length + 1 : 1,
				menuCategory: {
					ID: Number(id),
				},
				menuItemAddons: data,
			}
			dispatch(sendIcon(img, newData))
		} else if (type === 'edit') {
			const newData = {
				...e,
				tax: taxCount,
				ID: Number(itemid),
				menuItemAddons: data,
			}
			if (!img) {
				dispatch(updateMenuItem(newData))
			} else {
				dispatch(sendIcon(img, newData, 'update'))
			}
		}
	}

	const handleSearch = (value) => {
		if (value) {
			dispatch(filterAddons(value))
		}
	}

	const onSelect = (value) => {
		addonsFiltered.map((item) => {
			if (item.ID === value) {
				const newItem = {
					index: data.length ? data.length + 1 : 1,
					addon: item,
				}
				setData((state) => [...state, newItem])
			}
		})
		setValue('')
	}

	const dellAddonItem = (id) => {
		let arr = []
		let index = 0
		data.map((e, i) => {
			if (e.index !== id) {
				index++
				arr.push({
					...e,
					addon: e.addon,
					index: index,
				})
			}
		})
		setData(arr)
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
			width: 10,
			render: () => <DragHandle />,
		},
		{
			dataIndex: 'name',
			key: 'name',
			width: 400,
			render: (text, record) => {
				return (
					<div>
						<div style={{ marginBottom: '5px' }}>{record.addon.name}</div>
						<div style={{ marginBottom: '5px', color: '#8C8C8C' }}>
							${record.addon.price}
						</div>
					</div>
				)
			},
		},
		{
			dataIndex: 'action',
			key: 'action',
			width: 20,
			render: (text, record) => {
				return (
					<Button
						onClick={() => dellAddonItem(record.index)}
						type='primary'
						danger
						ghost
					>
						<img
							src='/assets/action/Delete.svg'
							alt='Icon'
							style={{ height: '17px', width: '20px' }}
						/>
					</Button>
				)
			},
		},
	]

	return (
		<>
			<PageHeader
				title={subName}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-2)}>{name}</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{subName}</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{addEdit}</Breadcrumb.Item>
					</Breadcrumb>
				}
			></PageHeader>
			<Content style={{ backgroundColor: '#F5F5F5' }}>
				<Content
					style={{ margin: 24, backgroundColor: 'white', position: 'relative' }}
				>
					<Row style={{ position: 'absolute', right: '15px', top: '10px' }}>
						{type === 'edit' ? (
							<ModalDelete
								id={Number(itemid)}
								index={index}
								value='dishWithIndexDetails'
								title={`${t('standart.dellStandartTitle')}`}
								content={`${t('standart.dellStandartContent')}`}
							/>
						) : null}
					</Row>
					<Row style={{ padding: '24px 0' }}>
						<Col span={10} offset={7}>
							<ConfigProvider locale={local}>
								<Form
									colon={true}
									name='basic'
									onFinish={onSubmit}
									autoComplete='off'
									layout='vertical'
									requiredMark={false}
									fields={fields}
								>
									<Form.Item label={`${t('dish.titleForImage')}`}>
										<UploadIcon
											data='image'
											onChange={(e) => {
												setImg(e)
											}}
											udate={true}
											url={
												icon !== 'undefined'
													? `${URL}/files/${icon?.replaceAll('/', '%2F')}`
													: null
											}
										/>
									</Form.Item>
									<Form.Item
										label={t('dish.titleForName')}
										name='name'
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please enter name!',
											},
										]}
									>
										<Input placeholder={t('dish.placeholderForName')} />
									</Form.Item>
									<Text>{`${t('dish.titleForDishFeatures')}`}</Text>
									<Form.Item name='isVegetarian' valuePropName='checked'>
										<Checkbox>{t('dish.titleForVegetarian')}</Checkbox>
									</Form.Item>
									<Form.Item
										label={t('dish.titleForDescription')}
										name='description'
										hasFeedback
										rules={[
											{
												required: true,
												message: 'Please enter description!',
											},
										]}
									>
										<TextArea
											showCount
											placeholder={t('dish.placeholderForDescription')}
											maxLength={300}
											rows={2}
										/>
									</Form.Item>
									<Row>
										<Col>
											<Form.Item
												{...config}
												name='price'
												label={t('dish.titleForPrice')}
											>
												<InputNumber
													onChange={(value) => {
														let s = (value / 100) * Number(tax)
														setTaxCount((value / 100) * Number(tax))
													}}
													style={{ width: 100 }}
													addonAfter='$'
													max={1000}
													min={0}
													maxLength={4}
													placeholder={0}
												/>
											</Form.Item>
										</Col>
										<Col>Tax: ${taxCount}</Col>
									</Row>

									<Form.Item label={t('dish.titleForStatus')} name='isActive'>
										<Select
											required
											name='status'
											defaultActiveFirstOption={true}
											defaultValue={true}
										>
											<Select.Option id={1} value={true}>
												<img
													src='/assets/status/green.svg'
													style={{ marginRight: 10 }}
												/>
												{t('standart.activeStatus')}
											</Select.Option>
											<Select.Option id={2} value={false}>
												<img
													src='/assets/status/red.svg'
													style={{ marginRight: 10 }}
												/>
												{t('standart.notActiveStatus')}
											</Select.Option>
										</Select>
									</Form.Item>
									<Text>Addons</Text>
									<Col style={{ position: 'relative' }}>
										<img
											src='/assets/search.svg'
											style={{
												position: 'absolute',
												zIndex: 22,
												right: 10,
												top: 22,
											}}
										/>
										<AutoComplete
											dropdownMatchSelectWidth={252}
											placeholder={t('dish.placeholderForAddonName')}
											style={{
												width: '100%',
												marginBottom: '20px',
												marginTop: '10px',
											}}
											onSelect={(e) => onSelect(e)}
											onSearch={handleSearch}
											value={value}
											onChange={setValue}
											dataSource={addonsFiltered}
											notFoundContent={t('bookings.NoResults')}
										>
											{addonsFiltered.length > 0 &&
												addonsFiltered.map((e) => (
													<Option key={e.ID} value={e.ID}>
														{e.name}
													</Option>
												))}
										</AutoComplete>
									</Col>
									<ConfigProvider renderEmpty={customizeRenderEmpty}>
										<Table
											style={{ marginBottom: '20px' }}
											pagination={false}
											showHeader={false}
											columns={columns}
											dataSource={data.sort((a, b) => a.index - b.index)}
											rowKey={'index'}
											components={{
												body: {
													wrapper: DraggableContainer,
													row: DraggableBodyRow,
												},
											}}
										/>
									</ConfigProvider>
									<Row justify='end'>
										<Col>
											<Button
												style={{ width: 114, marginBottom: 15 }}
												htmlType='submit'
												type='primary'
												loading={loading}
											>
												{t('button.titleForSave')}
											</Button>
										</Col>
									</Row>
								</Form>
							</ConfigProvider>
						</Col>
					</Row>
				</Content>
			</Content>
		</>
	)
}

export default CategoryDishesAddEdit
