import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, message, ConfigProvider, Pagination } from 'antd'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import WiFiDetails from './WiFiDetails/WiFiDetails'
import WiFiEditUI from './WiFiEdit/WiFiEdit'
import { getAllWiFis } from '../../../store/wifi'

const WiFiList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const messageErr = () => {
		message.error({
			content: `${t('settings.wifi.itemCannotBeDeleted')}`,
		})
	}
	useEffect(() => {
		dispatch(getAllWiFis())
	}, [])

	const { wifis, loading, deleteWiFis, isCreateWiFis, isUpdateWiFis, error } =
		useSelector((state) => state.wifis)

	const columns = [
		{
			title: `${t('settings.wifi.titleForName')}`,
			dataIndex: 'username',
			key: 'username',
			width: 524,
		},
		{
			title: `${t('settings.wifi.titleForPassword')}`,
			dataIndex: 'password',
			key: 'password',
			width: 524,
		},
		{
			title: `${t('settings.wifi.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 136,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<WiFiEditUI record={record} />
						</Col>
						<Col>
							<ModalDelete
								message={messageErr}
								id={record.ID}
								value='wifi'
								title={`${t('settings.wifi.dellWiFiTitle')}`}
								content={`${t('settings.wifi.dellWiFiContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteWiFis) {
			message.success(`${t('settings.wifi.dellWiFiSucces')}`)
			dispatch(getAllWiFis())
		}
		if (isUpdateWiFis) {
			message.success({
				content: `${t('settings.wifi.updateWiFiSuccess')}`,
			})
			dispatch(getAllWiFis())
		}
		if (isCreateWiFis) {
			message.success({
				content: `${t('settings.wifi.createdWiFiSucces')}`,
			})
			dispatch(getAllWiFis())
		}
	}, [deleteWiFis, isCreateWiFis, isUpdateWiFis])

	return !loading ? (
		wifis ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty}>
				<Table pagination={false} columns={columns} dataSource={wifis} />
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} type={'services'} />
		)
	) : (
		<SkeletonUI data='wifi' />
	)
}

export default WiFiList
