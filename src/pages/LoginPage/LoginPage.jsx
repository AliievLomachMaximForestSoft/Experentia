import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import validator from 'validator'
import { loginUser, errorLogin } from '../../store/login'
import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	Layout,
	Row,
	Typography,
	Modal,
	message,
} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
const { Title, Text } = Typography

const LoginPage = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const { loading, error } = useSelector((state) => state.login)

	const onSubmit = (data) => {
		if (data.email === undefined || data.password === undefined) {
			message.error(t('message.errorFillAllFields'))
		} else if (!validator.isEmail(data.email.trim())) {
			message.error(t('message.notCorrectEmail'))
		} else dispatch(loginUser(data))
	}
	useEffect(() => {
		if (error === '401') {
			Modal.error({
				title: `${t('message.noSuchUserExists')}`,
			})
		}
		if (error === '400') {
			Modal.error({
				title: `${t('message.incorrectPassword')}`,
			})
		}
		if (error === 'error') {
			Modal.error({
				title: `${t('message.noInternetConnection')}`,
			})
		}
		dispatch(errorLogin(''))
	}, [error])

	const onForgot = () => {
		navigate('/forgot')
	}

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
						src='assets/image/LoginImage.png'
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
											span={16}
											offset={4}
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
												{t('login.mainTitle')}{' '}
											</Title>
											<Text type='secondary'>
												{t('login.mainTitleDescription')}
											</Text>
										</Col>
									</Row>

									<Form
										colon={true}
										name='basic'
										initialValues={{ remember: true }}
										onFinish={onSubmit}
										autoComplete='off'
										layout='vertical'
									>
										<Form.Item name='email' className='inputEmail'>
											<Input
												prefix={
													<img
														src='/assets/login/mail.svg'
														style={{ marginRight: 10 }}
													/>
												}
												placeholder={t('login.placeholderForMail')}
											/>
										</Form.Item>
										<Form.Item
											style={{ marginBottom: '10px' }}
											name='password'
											className='inputPassword'
											required
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
										<Row justify='space-between'>
											<Col>
												<Form.Item name='remember' valuePropName='checked'>
													<Checkbox>{t('login.rememberMe')}</Checkbox>
												</Form.Item>
											</Col>
											<Col>
												<Form.Item name='forgot' valuePropName='checked'>
													<Button
														type='text'
														style={{ padding: 0 }}
														onClick={onForgot}
													>
														<Text type='success'>{t('login.forgot')}</Text>
													</Button>
												</Form.Item>
											</Col>
										</Row>

										<Button
											style={{ width: '100%', marginBottom: '70px' }}
											type='primary'
											loading={loading}
											className='submit__btn'
											htmlType='submit'
										>
											{t('login.inputButton')}
										</Button>
									</Form>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Layout>
	)
}

export default LoginPage
