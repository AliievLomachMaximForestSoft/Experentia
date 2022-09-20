import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Row, Modal, ConfigProvider } from 'antd'
import { updateWiFi } from '../../../../store/wifi'

const WiFiEdit = (props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { local } = useSelector((state) => state.local)
	const { loading, isUpdateWiFis } = useSelector((state) => state.wifis)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [fields, setFields] = useState([])
	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
		setFields([
			{
				name: ['username'],
				value: `${props.record.username}`,
			},
			{
				name: ['password'],
				value: `${props.record.password}`,
			},
		])
	}

	const show = () => {
		setIsModalVisible(true)
	}

	const updateWIFI = (e) => {
		e.ID = props.record.ID
		dispatch(updateWiFi(e))
	}

	useEffect(() => {
		setIsModalVisible(false)
		form.resetFields()
	}, [isUpdateWiFis])

	useEffect(() => {
		if (props.record) {
			setFields([
				{
					name: ['username'],
					value: `${props.record.username}`,
				},
				{
					name: ['password'],
					value: `${props.record.password}`,
				},
			])
		}
	}, [props.record])

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
					title={props.record.username || 'undefined'}
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
									onFinish={(e) => updateWIFI(e)}
									requiredMark={false}
								>
									<Form.Item
										{...config}
										label={t('settings.wifi.titleForName')}
										name='username'
										style={{ marginTop: 14 }}
									>
										<Input
											placeholder={t('settings.wifi.placeholderForWiFiName')}
										/>
									</Form.Item>
									<Form.Item
										{...config}
										label={t('settings.wifi.titleForPassword')}
										name='password'
										style={{ marginTop: 14 }}
									>
										<Input placeholder={t('settings.wifi.titleForPassword')} />
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
													loading={isUpdateWiFis}
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

export default WiFiEdit
