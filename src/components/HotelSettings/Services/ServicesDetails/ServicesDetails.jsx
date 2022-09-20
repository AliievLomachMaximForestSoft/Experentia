import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	Modal,
	InputNumber,
	Button,
	Checkbox,
	Tooltip,
	Image,
	Card,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
const URL = process.env.REACT_APP_URL
const { Text } = Typography
const { TextArea } = Input

const ServicesDetails = (props) => {
	const { t } = useTranslation()

	let image,
		background,
		status = ''

	const [isModalVisible, setIsModalVisible] = useState()

	const show = () => {
		setIsModalVisible(true)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	if (props.record && props.record.icon !== 'undefined') {
		image = props.record?.icon.replaceAll('/', '%2F')
		background = props.record?.background.replaceAll('/', '%2F')
	}
	status = props.record?.isActive ? 'Active' : 'Not Active'
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
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
							>
								<Form.Item
									label={`${t('services.titleForIcon')} (72x72)`}
									name='icon'
								>
									<Image
										src={
											image
												? `${URL}/files/${image}`
												: '/assets/image/Filled.svg'
										}
										width={72}
										preview={false}
									/>
								</Form.Item>
								<Form.Item label={t('services.titleForName')} name='name'>
									<Input
										placeholder={t('services.placeholderForName')}
										defaultValue={props.record.name}
									/>
								</Form.Item>

								<Form.Item
									label={t('services.titleForDescription')}
									name='description'
								>
									<TextArea
										showCount
										placeholder={t('services.placeholderForDescription')}
										maxLength={100}
										rows={2}
										defaultValue={props.record.description}
									/>
								</Form.Item>
								<Row justify={'space-between'} style={{ marginBottom: 10 }}>
									<Col>
										<Text>{t('services.titleForServiceType')}</Text>
									</Col>
									<Col>
										<Tooltip
											color={'white'}
											placement='rightTop'
											title={
												<Card
													title={
														<Text strong>
															{t('tooltip.tooltipServiceTypes')}
														</Text>
													}
												>
													<p>
														<Text strong>{t('tooltip.tooltipMenu')}</Text>
														{` - ${t('tooltip.tooltipMenuText')}`}
													</p>
													<p>
														<Text strong>{t('tooltip.tooltipStandart')}</Text>
														{` - ${t('tooltip.tooltipStandartText')}`}
													</p>
													<p>
														<Text strong>{t('tooltip.tooltipTaxi')}</Text>
														{` - ${t('tooltip.tooltipTaxiText')}`}
													</p>
													<p>
														<Text strong>{t('tooltip.tooltipAttraction')}</Text>
														{` - ${t('tooltip.tooltipAttractionText')}`}
													</p>
												</Card>
											}
										>
											<InfoCircleOutlined
												style={{
													color: 'rgba(0,0,0,.45)',
												}}
											/>
										</Tooltip>
									</Col>
								</Row>
								<Form.Item name='serviceType'>
									<Input
										name='serviceType'
										placeholder={t('services.placeholderForServiceType')}
										defaultValue={props.record.serviceType}
									></Input>
								</Form.Item>
								<Row justify={'space-between'} style={{ marginBottom: 10 }}>
									<Col>
										<Text>{t('services.titleForATST')}</Text>
									</Col>
									<Col>
										<Tooltip
											color={'white'}
											placement='rightTop'
											title={
												<Card
													title={<Text strong>{t('tooltip.tooltipATST')}</Text>}
												>
													<p>{t('tooltip.tooltipATSTtext')}</p>
													<p>
														<Text strong>{t('tooltip.tooltipASAP')}</Text>
														{` - ${t('tooltip.tooltipASAPtext')}`}
													</p>
													<p>
														<Text strong>{t('tooltip.tooltipTimeOnly')}</Text>
														{` - ${t('tooltip.tooltipTimeOnlyText')}`}
													</p>
													<p>
														<Text strong>
															{t('tooltip.tooltipDateAndTime')}
														</Text>
														{` - ${t('tooltip.tooltipDateAndTimeText')}`}
													</p>
													<p>
														<Text strong>{t('tooltip.tooltipNo')}</Text>
														{` - ${t('tooltip.tooltipNoText')}`}
													</p>
												</Card>
											}
										>
											<InfoCircleOutlined
												style={{
													color: 'rgba(0,0,0,.45)',
												}}
											/>
										</Tooltip>
									</Col>
								</Row>
								<Form.Item name='atst'>
									<Select
										mode='multiple'
										name='serviceType'
										placeholder={t('services.placeholderForATST')}
										allowClear
										defaultValue={props.record.abilityToSetTime}
									></Select>
								</Form.Item>

								<Form.Item name='tax'>
									<Row>
										<Col span={24} style={{ marginBottom: 10 }}>
											<Checkbox checked={props.record.tax > 0 ? true : false}>
												{t('services.titleForTax')}
											</Checkbox>
										</Col>
										<Col span={24}>
											<InputNumber
												style={{ width: 100 }}
												addonAfter='%'
												defaultValue={props.record.tax}
											/>
										</Col>
									</Row>
								</Form.Item>
								<Form.Item label={t('services.titleForStatus')} name='status'>
									<Input
										prefix={
											props.record.isActive ? (
												<img
													style={{ marginRight: 12 }}
													src='/assets/status/green.svg'
												/>
											) : (
												<img
													style={{ marginRight: 12 }}
													src='/assets/status/red.svg'
												/>
											)
										}
										defaultValue={status}
									/>
								</Form.Item>
								<Form.Item name='taxNumber'>
									<Image
										src={
											background
												? `${URL}/files/${background}`
												: '/assets/image/Filled.svg'
										}
									/>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default ServicesDetails
