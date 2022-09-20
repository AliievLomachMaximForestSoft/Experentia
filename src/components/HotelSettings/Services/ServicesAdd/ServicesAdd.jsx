import React, { useEffect, useState } from 'react'
import { PageHeader, Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import ServicesAddUI from '../ServicesAddUI/ServicesAddUI'
import ServicesEditUI from '../ServicesEditUI/ServiceEditUI'
import {
	createService,
	sendIcon,
	updateService,
	sendBackground,
} from '../../../../store/services'
import _ from 'lodash'

const ServicesAdd = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()
	const [serviceDatails, setServiceDatails] = useState()

	const {
		loading,
		services,
		iconUrl,
		backgroundUrl,
		loadingDetails,
		isCreateService,
		isUpdateService,
		deleteService,
	} = useSelector((state) => state.services)

	const setIcon = (icon) => {
		dispatch(sendIcon(icon))
	}

	const setBackground = (background) => {
		dispatch(sendBackground(background))
	}

	const onSubmit = (data, check) => {
		const newService = {
			icon: serviceDatails
				? serviceDatails.icon === 'undefined'
					? iconUrl
					: iconUrl !== 'undefined'
					? iconUrl
					: serviceDatails.icon
				: iconUrl,
			name: data.name,
			description: data.description,
			serviceType: data.serviceType,
			abilityToSetTime: data.atst
				? data.atst.length > 0
					? data.atst.filter((item) => item !== 'no')
					: ['no']
				: serviceDatails?.abilityToSetTime.length > 0
				? serviceDatails?.abilityToSetTime.filter((item) => item !== 'no')
				: ['no'],
			tax: check ? Number(data.tax) : 0,
			background: serviceDatails
				? serviceDatails.background === 'undefined'
					? backgroundUrl
					: backgroundUrl !== 'undefined'
					? backgroundUrl
					: serviceDatails.background
				: backgroundUrl,

			isActive: data.isActive,
			index: serviceDatails
				? serviceDatails.index
				: services.length
				? services.length + 1
				: 1,
		}
		if (params.id) {
			newService.ID = Number(params.id)
			dispatch(updateService(newService))
		} else {
			dispatch(createService(newService))
		}
	}

	useEffect(() => {
		if (isUpdateService || isCreateService) navigate('/hotelSettings/services')
	}, [isUpdateService, isCreateService])

	return (
		<>
			<PageHeader
				title={
					params.id
						? `${t('services.titleEditService')}
								 ${serviceDatails ? serviceDatails.name : '...'}`
						: `${t('services.titleAddNewService')}`
				}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a onClick={() => navigate(-1)}>{t('services.main')}</a>
						</Breadcrumb.Item>
						{params.id ? (
							<Breadcrumb.Item>
								{t('services.titleEditService')}
								{` ${serviceDatails ? serviceDatails.name : '...'}`}
							</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item>
								{t('services.titleAddNewService')}
							</Breadcrumb.Item>
						)}
					</Breadcrumb>
				}
			></PageHeader>
			{params.id ? (
				services.map((service) => {
					return service.ID === Number(params.id) ? (
						<ServicesEditUI
							key={params.id}
							id={params.id}
							serviceDetails={service}
							onSubmit={onSubmit}
							loading={loading}
							setIcon={setIcon}
							setServiceDatails={setServiceDatails}
							setBackground={setBackground}
							isUpdateService={isUpdateService}
							deleteService={deleteService}
						/>
					) : null
				})
			) : (
				<ServicesAddUI
					onSubmit={onSubmit}
					setIcon={setIcon}
					setBackground={setBackground}
					iconUrl={iconUrl}
					backgroundUrl={backgroundUrl}
					isCreateService={isCreateService}
				/>
			)}
		</>
	)
}

export default ServicesAdd
