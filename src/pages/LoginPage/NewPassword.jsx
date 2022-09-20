import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	ConfigProvider,
	Form,
	Input,
	Layout,
	message,
	Row,
	Typography,
} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { createNewPassword } from '../../store/login'
import { useLocation, useNavigate } from 'react-router'
const { Title, Text } = Typography

const NewPassword = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const location = useLocation()
	const { loading, resetPasswordSuccess } = useSelector((state) => state.login)
	const { local } = useSelector((state) => state.local)
	const navigate = useNavigate()
	const onSubmit = (data) => {
		dispatch(createNewPassword(data, location.search.slice(7)))
	}

	useEffect(() => {
		if (resetPasswordSuccess) {
			navigate('/', { replace: true })
			message.success('Reset password success!')
		}
	}, [resetPasswordSuccess])

	return (
		<Layout
			style={{
				height: '100vh',
				justifyContent: 'center',
				backgroundColor: '#F9FAF9',
			}}
		>
			<Row>
				<Col span={12}>
					<img
						src='assets/image/NewPasswordImage.png'
						style={{ height: '100vh', width: '100%', objectFit: 'cover' }}
					/>
				</Col>
				<Col span={12}>
					<Row align={'middle'} style={{ height: '100%' }}>
						<Col sm={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
							<Row justify='center'>
								<img
									src='/assets/login/logoGreen.png'
									style={{
										width: '103px',
										marginTop: '30px',
									}}
									alt=''
								/>
							</Row>
							<Row justify={'center'}>
								<Col xxl={12} xl={14} lg={14} md={16} sm={16} xs={20}>
									<Row>
										<Col
											align='center'
											span={21}
											offset={1}
											style={{
												marginTop: '12px',
												marginBottom: '24px',
											}}
										>
											<Title
												style={{
													marginBottom: '12px',
												}}
												level={2}
											>
												{t('login.create')}{' '}
											</Title>
											<Text type='secondary'>
												{t('login.newPasswordTitleDescription')}
											</Text>
										</Col>
									</Row>

									<ConfigProvider locale={local}>
										<Form
											form={form}
											colon={true}
											name='register'
											onFinish={onSubmit}
											autoComplete='off'
											layout='vertical'
										>
											<Form.Item
												style={{ marginBottom: '10px' }}
												name='password'
												hasFeedback
												rules={[
													{
														required: true,
														min: 8,
													},
												]}
											>
												<Input.Password
													prefix={
														<img
															src='/assets/login/password.svg'
															style={{ marginRight: 10 }}
														/>
													}
													placeholder={t('login.placeholForPassword')}
													iconRender={(visible) =>
														visible ? (
															<EyeTwoTone twoToneColor='#568159' />
														) : (
															<EyeInvisibleOutlined />
														)
													}
												/>
											</Form.Item>
											<Form.Item
												style={{ marginBottom: '10px' }}
												name='confirm'
												className='inputPassword'
												dependencies={['password']}
												hasFeedback
												rules={[
													{
														required: true,
														message: 'Please confirm your password!',
													},
													({ getFieldValue }) => ({
														validator(_, value) {
															if (
																!value ||
																getFieldValue('password') === value
															) {
																return Promise.resolve()
															}

															return Promise.reject(
																new Error(
																	'The two passwords that you entered do not match!'
																)
															)
														},
													}),
												]}
											>
												<Input.Password
													prefix={
														<img
															src='/assets/login/password.svg'
															style={{ marginRight: 10 }}
														/>
													}
													placeholder={t('login.placeholForRepeatPassword')}
													iconRender={(visible) =>
														visible ? (
															<EyeTwoTone twoToneColor='#568159' />
														) : (
															<EyeInvisibleOutlined />
														)
													}
												/>
											</Form.Item>
											<Button
												style={{
													width: '100%',
													marginBottom: '70px',
													marginTop: '24px',
												}}
												type='primary'
												loading={loading}
												className='submit__btn'
												htmlType='submit'
											>
												{t('button.titleForSave')}
											</Button>
										</Form>
									</ConfigProvider>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Layout>
	)
}

export default NewPassword
