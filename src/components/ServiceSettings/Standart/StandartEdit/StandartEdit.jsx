import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	ConfigProvider,
	InputNumber,
	Select,
} from 'antd'
import { updateStandartItem } from '../../../../store/servicesStandartType'

const StandartEdit = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const { local } = useSelector((state) => state.local)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fields, setFields] = useState([])

	const handleCancel = () => {
		setIsModalVisible(false)
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
		if (props.record) {
			setFields([
				{
					name: ['name'],
					value: props.record.name,
				},
				{
					name: ['price'],
					value: props.record.price,
				},
				{
					name: ['isActive'],
					value: props.record.isActive,
				},
			])
		}
	}, [props.record])

	const onSubmit = (e) => {
		const newDate = {
			...e,
			ID: Number(props.record.ID),
		}
		dispatch(updateStandartItem(newDate))
		setIsModalVisible(false)
	}

	return (
		<>
			<Button
				style={{ padding: 0, marginLeft: 12 }}
				type='text'
				onClick={() => {
					props.show ? props.show(props.record) : show()
				}}
			>
				<img src='/assets/action/Edit.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={props.record.name || 'undefined'}
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
											max={1000}
											min={0}
											maxLength={4}
											placeholder={0}
										/>
									</Form.Item>
									<Form.Item
										label={t('standart.titleForStatus')}
										name='isActive'
									>
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
													{t('modal.saveText')}
												</Button>
											</Col>
										</Row>
									</Form.Item>
								</Form>
							</ConfigProvider>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default StandartEdit
