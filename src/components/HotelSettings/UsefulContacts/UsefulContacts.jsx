import { Breadcrumb, PageHeader } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import UsefulContactsAdd from './UsefulContactsAdd/UsefulContactsAdd'
import UsefulContactsList from './UsefulContactsList'

const UsefulContacts = () => {
	const { t } = useTranslation()
	return (
		<>
			<PageHeader
				title={t('settings.usefulContacts.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>
							{t('settings.usefulContacts.main')}
						</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={<UsefulContactsAdd />}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<UsefulContactsList />
			</Content>
		</>
	)
}

export default UsefulContacts
