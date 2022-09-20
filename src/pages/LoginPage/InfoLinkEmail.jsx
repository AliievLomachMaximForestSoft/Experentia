import { Col, Layout, Row, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
const { Title, Text } = Typography

const InfoLinkEmail = () => {
	const { t } = useTranslation()
	return (
		<Layout
			style={{
				height: '100vh',
				justifyContent: 'center',
				backgroundColor: '#F9FAF9',
			}}
		>
			<Row align={'middle'} style={{ height: '100%' }}>
				<Col
					xxl={{ span: 8, offset: 8 }}
					xl={{ span: 10, offset: 7 }}
					lg={{ span: 14, offset: 5 }}
					md={{ span: 16, offset: 4 }}
					sm={{ span: 20, offset: 2 }}
					xs={{ span: 22, offset: 1 }}
				>
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
										{t('login.infoTitleMain')}
									</Title>
									<Text type='secondary'>
										{t('login.infoTitleDescription')}
									</Text>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Layout>
	)
}

export default InfoLinkEmail
