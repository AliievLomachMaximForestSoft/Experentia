import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Breadcrumb, Row, Col, Input } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useNavigate, useParams } from 'react-router'
import AddButton from '../../UI Components/AddButton/AddButton'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenuItems } from '../../../store/servicesMenuTypeItems'
import CategoryDishesList from './CategoryDishesList'

const CategoryDishes = () => {
	const { t } = useTranslation()
	const { name, subName, id, tax } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { menuItems } = useSelector((state) => state.settingsMenuTypeItems)

	useEffect(() => {
		dispatch(getAllMenuItems(id))
	}, [])
	console.log('menuItems', menuItems)
	return (
		<>
			<PageHeader
				title={subName}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{name}</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{subName}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={
					<AddButton
						data={'dish'}
						navigate={`/serviceSettings/${name}/${subName}/${id}/${tax}/dish-add/add`}
					/>
				}
			></PageHeader>
			<Content style={{ margin: '0 24px' }}>
				<CategoryDishesList
					menuItems={menuItems}
					id={id}
					name={name}
					subName={subName}
					tax={tax}
				/>
			</Content>
		</>
	)
}

export default CategoryDishes
