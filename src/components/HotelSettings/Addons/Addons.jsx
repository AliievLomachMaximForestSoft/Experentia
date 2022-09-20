import { Breadcrumb, PageHeader } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AddonsAdd from './AddonsAdd/AddonsAdd'
import AddonsList from './AddonsList'

const Addons = () => {
	const { t } = useTranslation()
	return (
		<>
			<PageHeader
				title={t('settings.addons.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>{t('settings.addons.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={<AddonsAdd />}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<AddonsList />
			</Content>
		</>
	)
}

export default Addons
