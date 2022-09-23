import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Result, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { setStatus } from '../../store/login'

const ErrorPage = ({ status }) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	return (
		<Row style={{ height: '100vh' }} align='middle'>
			<Col span={12} offset={6}>
				<Result
					status={
						status === 404
							? 500
							: status === 403
							? 403
							: status === 401
							? 'warning'
							: 'warning'
					}
					title={
						status === 404
							? '404'
							: status === 403
							? '403'
							: status === 401
							? '401'
							: 'There are some problems with your operation'
					}
					subTitle={
						status === 404
							? `${t('errors.404.text')}`
							: status === 403
							? `${t('errors.403.text')}`
							: status === 401
							? `${t('errors.401.text')}`
							: `${t('errors.some.text')}`
					}
					extra={
						<Button
							type='primary'
							onClick={() => {
								dispatch(setStatus(200))
								navigate(-1 || '/')
							}}
						>
							{`${t('button.BackHome')}`}
						</Button>
					}
				/>
			</Col>
		</Row>
	)
}

export default ErrorPage
