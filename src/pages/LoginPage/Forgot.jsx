import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import validator from 'validator'
import {
	Button,
	Col,
	Form,
	Input,
	Layout,
	Row,
	Typography,
	message,
	Modal,
} from 'antd'
import { sendEmail, sendingSuccess } from '../../store/login'
const { Title, Text } = Typography

const Forgot = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { loading, error, sending } = useSelector((state) => state.login)

	const onSubmit = (data) => {
		if (data.email === undefined || !validator.isEmail(data.email.trim())) {
			message.error(t('message.notCorrectEmail'))
		} else {
			dispatch(sendEmail(data))
		}
	}

	useEffect(() => {
		if (error) {
			Modal.success({
				content: `${t('message.noSuchUserExists')}`,
			})
		}
	}, [error])

	useEffect(() => {
		if (sending) {
			navigate('/info', { replace: true })

			dispatch(sendingSuccess(false))
		}
	}, [sending])

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
						src='assets/image/ForgotImage.png'
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
											span={18}
											offset={3}
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
												{t('login.forgot')}{' '}
											</Title>
											<Text type='secondary'>
												{t('login.forgotTitleDescription')}
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
										<Button
											style={{ width: '100%', marginBottom: '70px' }}
											type='primary'
											loading={loading}
											className='submit__btn'
											htmlType='submit'
										>
											{t('login.forgotButton')}
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

export default Forgot
