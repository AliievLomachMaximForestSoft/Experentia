import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Row, Modal, ConfigProvider } from 'antd'
import { updateUsefulContact } from '../../../../store/usefulContacts'

const UsefulContactsEdit = (props) => {
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
				name: ['phone'],
				value: `${props.record.phone}`,
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
					name: ['phone'],
					value: `${props.record.phone}`,
				},
			])
		}
	}, [props.record])

	const updateUContact = (e) => {
		e.index = props.record.index
		e.ID = props.record.ID
		dispatch(updateUsefulContact(e))
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
										label={t('settings.usefulContacts.titleForPhoneNumber')}
										name='phone'
										style={{ marginTop: 14 }}
										hasFeedback
										rules={[
											{
												required: true,

												max: 13,
												min: 13,
											},
										]}
									>
										<Input
											required
											placeholder={t(
												'settings.usefulContacts.titleForPhoneNumber'
											)}
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

export default UsefulContactsEdit
