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
import { createAddons } from '../../../../store/addons'

const AddonsAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { local } = useSelector((state) => state.local)
	const { loading, isCreateAddons } = useSelector((state) => state.addons)
	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const show = () => {
		setIsModalVisible(true)
	}

	const createAddon = (e) => {
		dispatch(createAddons({ ...e, tax: 0 }))
	}

	useEffect(() => {
		setIsModalVisible(false)
		form.resetFields()
	}, [isCreateAddons])

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
				{t('settings.addons.newAddon')}
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
									createAddon(e)
								}}
								requiredMark={false}
							>
								<Form.Item
									{...config}
									label={t('settings.addons.titleForName')}
									name='name'
									style={{ marginTop: 14 }}
								>
									<Input
										placeholder={t('settings.addons.placeholderAddonName')}
									/>
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

export default AddonsAdd
