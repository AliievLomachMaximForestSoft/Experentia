import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import {
	Col,
	Form,
	Input,
	Row,
	Modal,
	Image,
	Button,
	Avatar,
	Typography,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { getUserDetails } from '../../../store/users'
const { Text } = Typography

const UsersDetails = (props) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	const show = () => {
		setIsModalVisible(true)
		dispatch(getUserDetails(props.record.ID))
	}

	return (
		<>
			{props.record.guest?.avatar || props.record.avatar ? (
				<>
					{props.record.guest ? (
						<Button
							type='text'
							onClick={() => {
								show()
							}}
						>
							<Avatar
								src={props.record.guest.avatar}
								style={{ marginRight: 10 }}
							/>
							<Text>
								{`${props.record.guest.firstName} ${props.record.guest.lastName}`}
							</Text>
						</Button>
					) : (
						<Button
							type='text'
							style={{ padding: 0, marginTop: '45%', height: 24 }}
							onClick={() => {
								show()
							}}
						>
							<InfoCircleOutlined
								style={{
									fontSize: 22,
								}}
							/>
						</Button>
					)}
					{props.record && (
						<Modal
							title={`${
								props.record.guest?.firstName || props.record.firstName
							} ${props.record.guest?.lastName || props.record.lastName}`}
							visible={isModalVisible}
							onCancel={handleCancel}
							width={572}
							bodyStyle={{ paddingBottom: 0 }}
							footer={null}
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
										<Form.Item name='avatar'>
											{props.record.guest?.avatar || props.record.avatar ? (
												<Row align='center'>
													<Col>
														<Image
															src={
																props.record.guest?.avatar ||
																props.record.avatar
															}
															style={{ marginRight: 10, width: 225 }}
														/>
													</Col>
												</Row>
											) : (
												<img src='/assets/users/avatarDefault.svg' alt='LOGO' />
											)}
										</Form.Item>
										<Form.Item label={t('users.titleForFirstName')} name='name'>
											<Input
												defaultValue={
													props.record.guest?.firstName ||
													props.record.firstName
												}
											/>
										</Form.Item>
										<Form.Item
											label={t('users.titleForLastName')}
											name='lastName'
										>
											<Input
												defaultValue={
													props.record.guest?.lastName || props.record.lastName
												}
											/>
										</Form.Item>
										<Form.Item
											label={t('users.titleForPhoneNumber')}
											name='phone'
										>
											<Input
												placeholder='Unknown'
												defaultValue={
													props.record.guest?.phone || props.record.phone
												}
											/>
										</Form.Item>
										<Form.Item label={t('users.titleForEmail')} name='email'>
											<Input
												placeholder='Unknown'
												defaultValue={
													props.record.guest?.email || props.record.email
												}
											/>
										</Form.Item>
										<Form.Item
											label={t('users.titleForAddress')}
											name='address'
										>
											<Input
												placeholder='Unknown'
												defaultValue={
													props.record.guest?.address || props.record.address
												}
											/>
										</Form.Item>
										<Form.Item label={t('users.created')} name='createdAt'>
											<Input
												placeholder='Unknown'
												defaultValue={moment(
													props.record.guest?.createdAt ||
														props.record.createdAt
												).format('DD.MM.yyyy')}
											/>
										</Form.Item>
										<Form.Item label={t('users.updated')} name='updatedAt'>
											<Input
												placeholder='Unknown'
												defaultValue={moment(
													props.record.guest?.updatedAt ||
														props.record.updatedAt
												).format('DD.MM.yyyy')}
											/>
										</Form.Item>
									</Form>
								</Col>
							</Row>
						</Modal>
					)}
				</>
			) : (
				<>
					{props.record.guest ? (
						<Button
							type='text'
							onClick={() => {
								show()
							}}
						>
							<img
								src='/assets/users/avatarDefault.svg'
								style={{ marginRight: 10 }}
							/>
							{`${props.record.guest?.firstName} ${props.record.guest?.lastName}`}
						</Button>
					) : (
						<Button
							type='text'
							style={{ padding: 0, marginTop: '45%', height: 24 }}
							onClick={() => {
								show()
							}}
						>
							<InfoCircleOutlined
								style={{
									fontSize: 22,
								}}
							/>
						</Button>
					)}
					{props.record && (
						<Modal
							title={props.record.guest?.phone || props.record.phone}
							visible={isModalVisible}
							onCancel={handleCancel}
							width={572}
							bodyStyle={{ paddingBottom: 0 }}
							footer={null}
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
										<Form.Item name='avatar'>
											<Row align='center'>
												<img
													src='/assets/users/avatarDefault.svg'
													alt='LOGO'
													width={225}
												/>
											</Row>
										</Form.Item>
										<Form.Item
											label={t('users.titleForPhoneNumber')}
											name='phone'
										>
											<Input
												placeholder='Unknown'
												defaultValue={
													props.record.guest?.phone || props.record.phone
												}
											/>
										</Form.Item>
									</Form>
								</Col>
							</Row>
						</Modal>
					)}
				</>
			)}
		</>
	)
}

export default UsersDetails
