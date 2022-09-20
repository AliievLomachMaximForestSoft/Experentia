import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb, Row, Col, Input } from 'antd'
import { Content } from 'antd/es/layout/layout'
import MenuAdd from './MenuAdd/MenuAdd'
import MenuList from './MenuList'
import { useParams } from 'react-router'
import { getAllCategoryItems } from '../../../store/servicesMenuType'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { id, name, tax } = useParams()
	const { categoryItems, isCreateCategoryItems } = useSelector(
		(state) => state.settingsMenuType
	)
	useEffect(() => {
		dispatch(getAllCategoryItems(id))
	}, [id])

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
					<MenuAdd
						categoryItems={categoryItems}
						isCreateCategoryItems={isCreateCategoryItems}
					/>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<MenuList name={name} categoryItems={categoryItems} id={id} tax={tax} />
			</Content>
		</>
	)
}

export default Menu
