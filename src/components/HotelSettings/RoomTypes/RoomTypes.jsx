import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import RoomTypesList from './RoomTypesList'
import RoomTypesAdd from './RoomTypesAdd/RoomTypesAdd'

const RoomTypes = () => {
	const { t } = useTranslation()

	return (
		<>
			<PageHeader
				title={t('settings.roomTypes.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>{t('settings.roomTypes.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={<RoomTypesAdd />}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<RoomTypesList />
			</Content>
		</>
	)
}

export default RoomTypes
