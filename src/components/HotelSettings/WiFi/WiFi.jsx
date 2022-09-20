import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import WiFiList from './WiFiList'
import WiFiAdd from './WiFiAdd/WiFiAdd'

const WiFi = () => {
	const { t } = useTranslation()

	return (
		<>
			<PageHeader
				title={t('settings.wifi.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>{t('settings.wifi.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={<WiFiAdd />}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<WiFiList />
			</Content>
		</>
	)
}

export default WiFi
