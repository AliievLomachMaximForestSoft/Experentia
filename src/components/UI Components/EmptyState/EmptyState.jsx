import React from 'react'
import { ConfigProvider, Table } from 'antd'

export const customizeRenderEmpty = (type) =>
	type && type === 'services' ? (
		<div
			style={{
				textAlign: 'center',
				padding: '12%',
			}}
		>
			<img src='assets/OtherIcons/empty.svg' alt='' />
			<p>No Data</p>
		</div>
	) : (
		<div
			style={{
				textAlign: 'center',
				padding: '16%',
			}}
		>
			<img src='assets/OtherIcons/empty.svg' alt='' />
			<p>No Data</p>
		</div>
	)

const EmptyState = ({ columns, data, type }) => {
	return (
		<ConfigProvider renderEmpty={() => customizeRenderEmpty(type)}>
			<Table
				className='empty'
				style={{ height: '100%' }}
				pagination={false}
				columns={columns}
				dataSource={data}
			/>
		</ConfigProvider>
	)
}

EmptyState.propTypes = {}

export default EmptyState
