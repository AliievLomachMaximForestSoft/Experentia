import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Input, Row, Modal, ConfigProvider } from 'antd'
import { createRoomType } from '../../../../store/roomTypes'

const RoomTypesAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { local } = useSelector((state) => state.local)
	const { roomTypes, loading, isCreateRoomTypes } = useSelector(
		(state) => state.roomTypes
	)

	const [form] = Form.useForm()

	const handleCancel = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const show = () => {
		setIsModalVisible(true)
	}
	const createRoomTypes = (e) => {
		const index = roomTypes.length ? roomTypes.length + 1 : 1
		e.index = index
		dispatch(createRoomType(e))
	}

	useEffect(() => {
		setIsModalVisible(false)
		form.resetFields()
	}, [isCreateRoomTypes])

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
				{t('settings.roomTypes.newCategory')}
			</Button>
			<Modal
				title={t('settings.roomTypes.newCategory')}
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
									createRoomTypes(e)
								}}
								requiredMark={false}
							>
								<Form.Item
									{...config}
									label={t('settings.roomTypes.titleForName')}
									name='name'
									style={{ marginTop: 14 }}
								>
									<Input
										placeholder={t('settings.roomTypes.placeholderForName')}
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

export default RoomTypesAdd
