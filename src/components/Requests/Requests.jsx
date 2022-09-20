import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import RequestsList from './RequestsList'

const Requests = () => {
	const { t } = useTranslation()

	return (
		<>
			<PageHeader
				title={t('requests.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('requests.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<RequestsList />
			</Content>
		</>
	)
}

export default Requests
