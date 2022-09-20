import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Row, Modal, ConfigProvider } from 'antd'
import { createWiFi } from '../../../../store/wifi'

const WiFiAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { local } = useSelector((state) => state.local)
	const { loading, isCreateWiFis } = useSelector((state) => state.wifis)
	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const show = () => {
		setIsModalVisible(true)
	}

	const createWIFI = (e) => {
		dispatch(createWiFi(e))
	}

	useEffect(() => {
		setIsModalVisible(false)
		form.resetFields()
	}, [isCreateWiFis])

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
				{t('settings.wifi.newCategory')}
			</Button>
			<Modal
				title={'New'}
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
								colon={true}
								form={form}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
								onFinish={(e) => {
									createWIFI(e)
								}}
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

export default WiFiAdd
