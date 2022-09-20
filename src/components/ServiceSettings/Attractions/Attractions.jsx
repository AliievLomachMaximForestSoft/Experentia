import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb, Row, Col, Input } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../../UI Components/AddButton/AddButton'
import AttractionsList from './AttractionsList'
import { getAllAttractions } from '../../../store/servicesAttractions'

const Attractions = () => {
	const { t } = useTranslation()
	const { name, id } = useParams()
	const dispatch = useDispatch()
	const { attractions } = useSelector((state) => state.settingsAttractionsType)

	useEffect(() => {
		dispatch(getAllAttractions())
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
					<AddButton
						data={'attraction'}
						navigate={`/serviceSettings/${name}/${id}/attraction/add`}
					/>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<AttractionsList attractions={attractions} id={id} name={name} />
			</Content>
		</>
	)
}

export default Attractions
