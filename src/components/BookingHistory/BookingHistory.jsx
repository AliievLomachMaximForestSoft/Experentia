import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb } from 'antd'
import { Content } from 'antd/es/layout/layout'
import BookingHistoryList from './BookingHistoryList'

const BookingHistory = () => {
	const { t } = useTranslation()

	return (
		<>
			<PageHeader
				title={t('bookingsHistory.main')}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('bookingsHistory.main')}</Breadcrumb.Item>
					</Breadcrumb>
				}
			/>
			<Content style={{ margin: '0 24px' }}>
				<BookingHistoryList />
			</Content>
		</>
	)
}

export default BookingHistory
