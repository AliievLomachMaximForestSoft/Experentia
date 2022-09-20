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
} from 'antd'
import { updateAddon } from '../../../../store/addons'

const AddonsEdit = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { local } = useSelector((state) => state.local)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fields, setFields] = useState([])
	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
		setFields([
			{
				name: ['name'],
				value: `${props.record.name}`,
			},
			{
				name: ['price'],
				value: `${props.record.price}`,
			},
		])
	}

	const show = () => {
		setIsModalVisible(true)
	}
	useEffect(() => {
		if (props.record) {
			setFields([
				{
					name: ['name'],
					value: `${props.record.name}`,
				},
				{
					name: ['price'],
					value: `${props.record.price}`,
				},
			])
		}
	}, [props.record])

	const updateUContact = (data) => {
		data.ID = props.record.ID
		let newData = {
			...data,
			tax: 0,
			price: Number(data.price),
		}
		dispatch(updateAddon(newData))
	}

	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
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
									onFinish={(e) => {
										updateUContact(e)
									}}
								>
									<Form.Item
										{...config}
										label={t('settings.usefulContacts.titleForName')}
										name='name'
										style={{ marginTop: 14 }}
									>
										<Input
											placeholder={t(
												'settings.usefulContacts.placeholderContactName'
											)}
										/>
									</Form.Item>
									<Form.Item
										{...config}
										name='price'
										label={t('settings.addons.titleForPrice')}
									>
										<InputNumber
											placeholderstyle={{ width: 100 }}
											addonAfter='$'
											max={1000}
											min={0}
											maxLength={3}
										/>
									</Form.Item>
									<Form.Item>
										<Row align='middle' justify='end'>
											<Col>
												<Button
													onClick={() => {
														handleCancel()
													}}
												>
													{t('modal.cancelText')}
												</Button>
											</Col>
											<Col>
												<Button
													style={{ marginLeft: 14 }}
													htmlType='submit'
													type='primary'
													loading={props.isUpdateProperty}
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

export default AddonsEdit
