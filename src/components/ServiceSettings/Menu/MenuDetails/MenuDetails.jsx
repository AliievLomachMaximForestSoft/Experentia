import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useDispatch, useSelector } from 'react-redux'
import { updateCategoryItem } from '../../../../store/servicesMenuType'

const MenuDetails = (props) => {
	const { t } = useTranslation()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const dispatch = useDispatch()
	const [fields, setFields] = useState([])
	const [form] = Form.useForm()
	const { local } = useSelector((state) => state.local)
	const config = {
		hasFeedback: true,
		rules: [
			{
				required: true,
			},
		],
	}
	const handleCancel = () => {
		setIsModalVisible(false)
	}
	useEffect(() => {
		if (props.record) {
			setFields([
				{
					name: ['name'],
					value: props.record.name,
				},
				{
					name: ['isActive'],
					value: props.record.isActive,
				},
			])
		}
	}, [props.record])

	const show = () => {
		setIsModalVisible(true)
	}

	const onSubmit = (e) => {
		const newDate = {
			...e,
			ID: Number(props.record.ID),
		}
		dispatch(updateCategoryItem(newDate))
		setIsModalVisible(false)
	}

	return (
		<>
			<Button
				style={{ padding: 0, marginLeft: 12 }}
				type='text'
				onClick={() => {
					show ? show(props.record) : show()
				}}
			>
				<img src='/assets/action/Edit.svg' alt='' />
			</Button>
			<Modal
				title={props.record.name}
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
								requiredMark={false}
								onFinish={onSubmit}
							>
								<Form.Item
									{...config}
									requiredMark={false}
									label={t('menu.titleForName')}
									name='name'
									style={{ marginTop: 14 }}
								>
									<Input />
								</Form.Item>
								<Form.Item label={t('menu.titleForStatus')} name='isActive'>
									<Select
										required
										name='isActive'
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
		</>
	)
}

export default MenuDetails
