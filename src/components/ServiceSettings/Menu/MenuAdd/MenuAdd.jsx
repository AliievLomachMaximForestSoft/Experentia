import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	Select,
	ConfigProvider,
} from 'antd'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { createCategory } from '../../../../store/servicesMenuType'

const MenuAdd = (props) => {
	const { t } = useTranslation()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fields, setFields] = useState([])
	const params = useParams()
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const { local } = useSelector((state) => state.local)
	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	const show = () => {
		setIsModalVisible(true)
	}

	useEffect(() => {
		setFields([
			{
				name: ['isActive'],
				value: true,
			},
		])
	}, [props.isCreateCategoryItems])

	const onSubmit = (e) => {
		const newData = {
			...e,
			index: props.categoryItems.length ? props.categoryItems.length + 1 : 1,
			propertyService: {
				ID: Number(params.id),
			},
		}
		dispatch(createCategory(newData))
		setIsModalVisible(false)
		form.resetFields()
	}

	return (
		<>
			<Button
				type='primary'
				onClick={() => {
					show()
				}}
			>
				{t('menu.addNewCategory')}
			</Button>
			<Modal
				title={t('menu.addNewCategory')}
				visible={isModalVisible}
				onCancel={handleCancel}
				width={572}
				bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
				footer={null}
			>
				<Row>
					<Col span={24}>
						<ConfigProvider locale={local}>
							<Form
								fields={fields}
								form={form}
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={onSubmit}
								requiredMark={false}
							>
								<Form.Item
									{...config}
									label={t('menu.titleForName')}
									name='name'
									style={{ marginTop: 14 }}
								>
									<Input />
								</Form.Item>
								<Form.Item label={t('menu.titleForStatus')} name='isActive'>
									<Select
										required
										name='status'
										defaultActiveFirstOption={true}
										defaultValue={false}
									>
										<Select.Option id={1} value={true}>
											<img
												src='/assets/status/green.svg'
												style={{ marginRight: 10 }}
											/>
											{t('menu.activeStatus')}
										</Select.Option>
										<Select.Option id={2} value={false}>
											<img
												src='/assets/status/red.svg'
												style={{ marginRight: 10 }}
											/>
											{t('menu.notActiveStatus')}
										</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item>
									<Row align='middle' justify='end'>
										<Col>
											<Button onClick={handleCancel}>
												{t('modal.cancelText')}
											</Button>
										</Col>
										<Col>
											<Button
												style={{ marginLeft: 14 }}
												htmlType='submit'
												type='primary'
											>
												{t('modal.okText')}
											</Button>
										</Col>
									</Row>
								</Form.Item>
							</Form>
						</ConfigProvider>
					</Col>
				</Row>
			</Modal>
		</>
	)
}

export default MenuAdd
