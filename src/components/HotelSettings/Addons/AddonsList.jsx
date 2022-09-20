import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Row, Col, message, ConfigProvider, Pagination } from 'antd'
import SkeletonUI from '../../UI Components/Skeleton/SkeletonUI'
import EmptyState, {
	customizeRenderEmpty,
} from '../../UI Components/EmptyState/EmptyState'
import ModalDelete from '../../UI Components/Modal/ModalDelete'
import { getAllAddons } from '../../../store/addons'
import AddonsEdit from './AddonsEdit/AddonsEdit'

const AddonsList = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	useEffect(() => {
		dispatch(getAllAddons())
	}, [])

	const messageErr = () => {
		message.error({
			content: `${t('settings.addons.itemCannotBeDeleted')}`,
		})
	}
	const onChangePage = (page, pageSize) => {
		dispatch(getAllAddons(page, pageSize))
	}

	const { addons, loading, deleteAddons, isCreateAddons, isUpdateAddons } =
		useSelector((state) => state.addons)

	const columns = [
		{
			title: `${t('settings.addons.titleForName')}`,
			dataIndex: 'name',
			key: 'name',
			width: 824,
		},
		{
			title: `${t('settings.addons.titleForPrice')}`,
			dataIndex: 'price',
			key: 'price',
			width: 184,
			render: (text) => {
				return <div>${text}</div>
			},
		},
		{
			title: `${t('settings.addons.titleForAction')}`,
			dataIndex: 'action',
			key: 'action',
			width: 125,
			render: (text, record) => {
				return (
					<Row justify='space-beetween'>
						<Col>
							<AddonsEdit record={record} />
						</Col>
						<Col>
							<ModalDelete
								id={record.ID}
								message={messageErr}
								value='addon'
								title={`${t('settings.addons.dellAddonTitle')}`}
								content={`${t('settings.addons.dellAddonContent')}`}
							/>
						</Col>
					</Row>
				)
			},
		},
	]

	useEffect(() => {
		if (deleteAddons) {
			message.success(`${t('settings.addons.dellAddonSucces')}`)
			dispatch(getAllAddons())
		}
		if (isUpdateAddons) {
			message.success({
				content: `${t('settings.addons.updateAddonSuccess')}`,
			})
			dispatch(getAllAddons())
		}
		if (isCreateAddons) {
			message.success({
				content: `${t('settings.addons.createdAddonSucces')}`,
			})
			dispatch(getAllAddons())
		}
	}, [deleteAddons, isCreateAddons, isUpdateAddons])
	console.log('addons', addons)
	return !loading ? (
		addons.items ? (
			<ConfigProvider renderEmpty={customizeRenderEmpty} locale={local}>
				<Table pagination={false} columns={columns} dataSource={addons.items} />
				<Pagination
					style={{ textAlign: 'right', marginTop: 14, marginBottom: 14 }}
					total={addons.meta.totalItems}
					showTotal={(total) =>
						`${t('pagination.paginationTotal')} ${total} ${t(
							'pagination.paginationItems'
						)}`
					}
					defaultPageSize={30}
					current={addons.meta.currentPage}
					hideOnSinglePage
					pageSize={addons.meta.itemsPerPage}
					showSizeChanger={false}
					onChange={onChangePage}
				/>
			</ConfigProvider>
		) : (
			<EmptyState columns={columns} data={null} type={'services'} />
		)
	) : (
		<SkeletonUI data='addons' />
	)
}

export default AddonsList
