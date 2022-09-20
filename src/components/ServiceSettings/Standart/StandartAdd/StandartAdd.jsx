import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	Select,
	InputNumber,
	ConfigProvider,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { createStandart } from '../../../../store/servicesStandartType'

const StandartAdd = (props) => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fields, setFields] = useState([])
	const { local } = useSelector((state) => state.local)

	const handleCancel = () => {
		setIsModalVisible(false)
		// form.resetFields()
	}
	const show = () => {
		setIsModalVisible(true)
	}

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}

	useEffect(() => {
		setFields([
			{
				name: ['isActive'],
				value: true,
			},
		])
	}, [props.isCreateStandartItems])

	const onSubmit = (e) => {
		const newData = {
			...e,
			index: props.standartItems.length ? props.standartItems.length + 1 : 1,
			propertyService: {
				ID: Number(props.id),
			},
		}
		dispatch(createStandart(newData))
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
				{t('standart.addNewServiceItem')}
			</Button>
			<Modal
				title={t('standart.addNewServiceItem')}
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
								requiredMark={false}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={onSubmit}
							>
								<Form.Item
									{...config}
									label={t('standart.titleForName')}
									name='name'
									style={{ marginTop: 14 }}
								>
									<Input />
								</Form.Item>
								<Form.Item
									{...config}
									name='price'
									label={t('settings.addons.titleForPrice')}
								>
									<InputNumber
										style={{ width: 100 }}
										addonAfter='$'
										max={100}
										min={0}
										maxLength={3}
										placeholder={0}
									/>
								</Form.Item>
								<Form.Item label={t('standart.titleForStatus')} name='isActive'>
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
												// loading={props.isCreateProperty}
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

export default StandartAdd
