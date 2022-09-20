import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Result, Row, Col } from 'antd'

const ErrorPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	return (
		<Row style={{ height: '100vh' }} align='middle'>
			<Col span={12} offset={6}>
				<Result
					status={500}
					title='404'
					subTitle={`${t('404.text')}`}
					extra={
						<Button type='primary' onClick={() => navigate('/')}>
							{`${t('button.BackHome')}`}
						</Button>
					}
				/>
			</Col>
		</Row>
	)
}

export default ErrorPage
