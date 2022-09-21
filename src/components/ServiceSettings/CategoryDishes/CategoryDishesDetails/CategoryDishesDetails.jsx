import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Col,
	Form,
	Input,
	Row,
	Modal,
	Button,
	Image,
	Checkbox,
	InputNumber,
	Select,
	Table,
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
const URL = process.env.REACT_APP_URL

const CategoryDishesDetails = (props) => {
	const { t } = useTranslation()

	const [isModalVisible, setIsModalVisible] = useState()

	const show = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const columns = [
		{
			dataIndex: 'drag',
			key: 'drag',
			width: 10,
			render: () => {
				return (
					<Row align='center'>
						<img src='/assets/OtherIcons/DragNdrop.svg' />
					</Row>
				)
			},
		},
		{
			dataIndex: 'name',
			key: 'name',
			width: 400,
			render: (text, record) => {
				return (
					<div>
						<div style={{ marginBottom: '5px' }}>{record.addon.name}</div>
						<div style={{ marginBottom: '5px', color: '#8C8C8C' }}>
							${record.addon.price}
						</div>
					</div>
				)
			},
		},
	]

	return (
		<>
			<Button style={{ padding: 0 }} type='text' onClick={() => show()}>
				<img src='/assets/action/Eye.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={props.record.name}
					visible={isModalVisible}
					onCancel={handleCancel}
					footer={null}
					width={572}
					bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
				>
					<Row style={{ margin: '24px 0 24px 0' }}>
						<Col span={24}>
							<Form
								colon={true}
								name='basic'
								autoComplete='off'
								layout='vertical'
								requiredMark={false}
							>
								<Form.Item label={`${t('dish.titleForImage')}`}>
									{props.record.image ? (
										<Image
											src={`${URL}/files/${props.record.image.replaceAll(
												'/',
												'%2F'
											)}`}
											width={238}
											preview={true}
											style={{ marginBottom: '20px' }}
										/>
									) : null}
								</Form.Item>
								<Form.Item
									label={t('dish.titleForName')}
									name='name'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please enter name!',
										},
									]}
								>
									<Input
										placeholder={t('dish.placeholderForName')}
										defaultValue={props.record.name}
									/>
								</Form.Item>
								<Form.Item label={`${t('dish.titleForDishFeatures')}`}>
									<Checkbox
										checked={props.record.isVegetarian}
										valuePropName='checked'
									>
										{t('dish.titleForVegetarian')}
									</Checkbox>
								</Form.Item>
								<Form.Item
									label={t('dish.titleForDescription')}
									name='description'
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please enter description!',
										},
									]}
								>
									<TextArea
										showCount
										placeholder={t('dish.placeholderForDescription')}
										maxLength={300}
										rows={2}
										defaultValue={props.record.description}
									/>
								</Form.Item>
								<Form.Item name='price' label={t('dish.titleForPrice')}>
									<InputNumber
										style={{ width: 100 }}
										addonAfter='$'
										max={1000}
										min={0}
										maxLength={4}
										placeholder={0}
										defaultValue={props.record.price}
									/>
								</Form.Item>
								<Form.Item label={t('dish.titleForStatus')} name='isActive'>
									<Select
										required
										name='status'
										defaultActiveFirstOption={props.record.isActive}
										defaultValue={props.record.isActive}
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
							</Form>
							{props.record.menuItemAddons.length ? (
								<Table
									style={{
										marginBottom: '20px',
									}}
									showHeader={false}
									pagination={false}
									dataSource={props.record.menuItemAddons}
									columns={columns}
								/>
							) : null}
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default CategoryDishesDetails
