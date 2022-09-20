import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import ServicesList from './ServicesList/ServicesList'
import AddButton from '../../UI Components/AddButton/AddButton'

const Services = () => {
	const { t } = useTranslation()

	return (
		<>
			<PageHeader
				title={t('services.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('services.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={
					<AddButton data='services' navigate='/hotelSettings/services/add' />
				}
			></PageHeader>
			<Content style={{ margin: '8px 24px 24px' }}>
				<ServicesList />
			</Content>
		</>
	)
}

export default Services
