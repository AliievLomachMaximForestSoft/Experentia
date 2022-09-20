import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { PageHeader, Breadcrumb, notification } from 'antd'
import { updateProperties, getProperty } from '../../../store/properties'
import AboutEdit from './AboutEdit'

const About = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { property, isUpdateProperty, logoUrl, galeryArray } = useSelector(
		(state) => state.properties
	)

	useEffect(() => {
		dispatch(getProperty())
	}, [])

	const onSubmit = (data, address, lat, lng) => {
		if (data) {
			const newProperties = {
				ID: property.ID,
				logo: logoUrl || property.logo,
				gallery: galeryArray,
				name: data.name,
				currency: data.currency,
				phone: data.phone,
				email: data.email,
				isActive: data.status === 'true' ? true : false,
				description: data.description,
				address: {
					city: data.city,
					state: data.state,
					country: data.country,
					fullAddress: address,
					lat: lat,
					lng: lng,
				},
			}
			dispatch(updateProperties(newProperties))
		}
	}

	useEffect(() => {
		if (isUpdateProperty) {
			navigate('/hotelSettings/about')
			dispatch(getProperty())
			window.scrollTo(0, 0)
			notification.success({
				message: `${t('settings.about.updatePropertySuccess')}`,
			})
		}
	}, [isUpdateProperty])

	return (
		<>
			<PageHeader
				title={`${t('settings.about.titleAbout')}`}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>{t('settings.main')}</Breadcrumb.Item>

						<Breadcrumb.Item>{t('settings.about.titleAbout')}</Breadcrumb.Item>
					</Breadcrumb>
				}
			></PageHeader>
			<AboutEdit onSubmit={onSubmit} />
		</>
	)
}

export default About
