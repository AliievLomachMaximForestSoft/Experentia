import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader, Breadcrumb, Row, Col, Input } from 'antd'
import { Content } from 'antd/es/layout/layout'
import StandartAdd from './StandartAdd/StandartAdd'
import StandartList from './StandartList'
import { getAllStandartItems } from '../../../store/servicesStandartType'
import { useParams } from 'react-router'

const Standart = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { id, name } = useParams()
	const { standartItems, isCreateStandartItems } = useSelector(
		(state) => state.settingStandartType
	)

	useEffect(() => {
		dispatch(getAllStandartItems(id))
	}, [])

	return (
		<>
			<PageHeader
				title={name}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>{name}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={
					<StandartAdd
						id={id}
						standartItems={standartItems}
						isCreateStandartItems={isCreateStandartItems}
					/>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<StandartList standartItems={standartItems} id={id} />
			</Content>
		</>
	)
}

export default Standart
