import React, { useState, useEffect, useParams } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	Tooltip,
	Checkbox,
	InputNumber,
	Card,
	message,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Content } from 'antd/es/layout/layout'
import UploadIcon from '../../../UI Components/UploadImage/UploadIcon'
import UploadBackground from '../../../UI Components/UploadImage/UploadBackground'
import ModalDelete from '../../../UI Components/Modal/ModalDelete'
import { setIndexDel } from '../../../../store/services'
import { useSelector } from 'react-redux'
const { Text } = Typography
const { TextArea } = Input
const URL = process.env.REACT_APP_URL

const ServicesEditUI = (props) => {
	const { t } = useTranslation()
	const [fields, setFields] = useState([])
	const [check, setCheck] = useState(
		props.serviceDetails.tax > 0 ? true : false
	)
	const { loading } = useSelector((state) => state.services)
	useEffect(() => {
		props.setServiceDatails(props.serviceDetails)
	}, [])

	useEffect(() => {
		if (props.id) {
			setFields([
				{
					name: ['name'],
					value: `${props.serviceDetails.name}`,
				},
				{
					name: ['description'],
					value: `${props.serviceDetails.description}`,
				},
				{
					name: ['serviceType'],
					value: `${props.serviceDetails.serviceType}`,
				},
				{
					name: ['tax'],
					value: `${props.serviceDetails.tax}`,
				},
				{
					name: ['isActive'],
					value: props.serviceDetails.isActive,
				},
			])
		}
	}, [props.serviceDetails])

	const messageErr = () => {
		message.error({
			content: `${t('settings.wifi.itemCannotBeDeleted')}`,
		})
	}

	return (
		<Content style={{ backgroundColor: '#F5F5F5' }}>
			<Content
				style={{ position: 'relative', margin: 24, backgroundColor: 'white' }}
			>
				<Row style={{ position: 'absolute', right: '15px', top: '10px' }}>
					<ModalDelete
						id={props.serviceDetails.ID}
						index={props.serviceDetails.index}
						message={messageErr}
						value='servicesWithIndexDetails'
						setIndexDel={setIndexDel}
						title={`${t('services.dellServicesTitle')}`}
						content={`${t('services.dellServicesContent')}`}
					/>
				</Row>
				<Row style={{ padding: '24px 0 24px 0' }}>
					<Col span={10} offset={7}>
						<Form
							fields={fields}
							colon={true}
							name='basic'
							initialValues={{ remember: true }}
							onFinish={(e) => props.onSubmit(e, check)}
							autoComplete='off'
							layout='vertical'
						>
							<Form.Item label={`${t('services.titleForIcon')} (72x72)`}>
								<UploadIcon
									onChange={(e) => {
										props.setIcon(e)
									}}
									udate={true}
									url={
										props.serviceDetails.icon !== 'undefined'
											? `${URL}/files/${props.serviceDetails?.icon?.replaceAll(
													'/',
													'%2F'
											  )}`
											: ''
									}
								/>
							</Form.Item>
							<Form.Item label={t('services.titleForName')} name='name'>
								<Input
									required
									placeholder={t('services.placeholderForName')}
								/>
							</Form.Item>

							<Form.Item
								label={t('services.titleForDescription')}
								name='description'
							>
								<TextArea
									required
									showCount
									placeholder={t('services.placeholderForDescription')}
									maxLength={100}
									rows={2}
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
													<Text strong>{t('tooltip.tooltipServiceTypes')}</Text>
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
								<Select
									required
									name='serviceType'
									placeholder={t('services.placeholderForServiceType')}
									allowClear
								>
									<Select.Option value='Menu'>
										{t('tooltip.tooltipMenu')}
									</Select.Option>
									<Select.Option value='Standart'>
										{t('tooltip.tooltipStandart')}
									</Select.Option>
									<Select.Option value='Taxi'>
										{t('tooltip.tooltipTaxi')}
									</Select.Option>
									<Select.Option value='Attraction'>
										{t('tooltip.tooltipAttraction')}
									</Select.Option>
								</Select>
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
													<Text strong>{t('tooltip.tooltipASAP')}</Text> -
													{t('tooltip.tooltipASAPtext')}
												</p>
												<p>
													<Text strong>{t('tooltip.tooltipTimeOnly')}</Text> -{' '}
													{t('tooltip.tooltipTimeOnlyText')}
												</p>
												<p>
													<Text strong>{t('tooltip.tooltipDateAndTime')}</Text>{' '}
													- {t('tooltip.tooltipDateAndTimeText')}
												</p>
												<p>
													<Text strong>{t('tooltip.tooltipNo')}</Text> -{' '}
													{t('tooltip.tooltipNoText')}
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
									name='atst'
									placeholder={t('services.placeholderForATST')}
									mode='multiple'
									defaultValue={props.serviceDetails.abilityToSetTime}
								>
									<Select.Option value='asap'>
										{t('tooltip.tooltipASAP')}
									</Select.Option>
									<Select.Option value='time'>
										{t('tooltip.tooltipTimeOnly')}
									</Select.Option>
									<Select.Option value='date_time'>
										{t('tooltip.tooltipDateAndTime')}
									</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item>
								<Checkbox
									checked={check}
									onChange={(e) => setCheck(e.target.checked)}
								>
									{t('services.titleForTax')}
								</Checkbox>
							</Form.Item>
							<Form.Item name='tax'>
								<InputNumber
									disabled={!check}
									defaultValue={props.serviceDetails.tax}
									style={{ width: 100 }}
									addonAfter='%'
									max={100}
									min={0}
									maxLength={3}
								/>
							</Form.Item>
							<Form.Item label={t('services.titleForStatus')} name='isActive'>
								<Select required name='isActive'>
									<Select.Option id={1} value={true}>
										<img
											src='/assets/status/green.svg'
											style={{ marginRight: 10 }}
										/>
										{t('services.activeStatus')}
									</Select.Option>
									<Select.Option id={2} value={false}>
										<img
											src='/assets/status/red.svg'
											style={{ marginRight: 10 }}
										/>
										{t('services.notActiveStatus')}
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item>
								<UploadBackground
									onChange={(e) => {
										props.setBackground(e)
									}}
									udate={true}
									url={
										props.serviceDetails.background !== 'undefined'
											? `${URL}/files/${props.serviceDetails?.background?.replaceAll(
													'/',
													'%2F'
											  )}`
											: ''
									}
								/>
							</Form.Item>

							<Row justify='end'>
								<Col>
									<Button
										style={{ width: 114 }}
										htmlType='submit'
										type='primary'
										loading={loading}
									>
										{t('button.titleForSave')}
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Content>
		</Content>
	)
}

export default ServicesEditUI
