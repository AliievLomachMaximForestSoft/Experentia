import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Row, Modal, ConfigProvider } from 'antd'
import { createUsefulContact } from '../../../../store/usefulContacts'

const UsefulContactsAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { local } = useSelector((state) => state.local)
	const { usefulContacts, loading, isCreateUsefulContacts } = useSelector(
		(state) => state.usefulContacts
	)
	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const show = () => {
		setIsModalVisible(true)
	}
	const createUsefulContacts = (e) => {
		const index = usefulContacts.length ? usefulContacts.length + 1 : 1
		e.index = index
		dispatch(createUsefulContact(e))
	}

	useEffect(() => {
		setIsModalVisible(false)
		form.resetFields()
	}, [isCreateUsefulContacts])

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
				type='primary'
				onClick={() => {
					show()
				}}
			>
				{t('settings.usefulContacts.newUsefulContact')}
			</Button>
			<Modal
				title={t('settings.usefulContacts.newUsefulContact')}
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
								form={form}
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={(e) => {
									createUsefulContacts(e)
								}}
								requiredMark={false}
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
											<Button onClick={handleCancel}>
												{t('modal.cancelText')}
											</Button>
										</Col>
										<Col>
											<Button
												style={{ marginLeft: 14 }}
												htmlType='submit'
												type='primary'
												loading={loading}
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

export default UsefulContactsAdd
