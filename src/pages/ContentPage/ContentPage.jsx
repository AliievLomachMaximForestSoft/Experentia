import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { Layout } from 'antd'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useDispatch } from 'react-redux'
import { setSocket, socket_ } from '../../store/socket'
const { Sider } = Layout

const ContentPage = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setSocket(socket_))
	}, [])

	return (
		<Layout style={{ minHeight: '100%' }}>
			<HeaderMain />
			<Layout>
				<Sider
					width={220}
					style={{
						overflow: 'auto',
						marginTop: '48px',
						position: 'fixed',
						left: 0,
						top: 0,
						bottom: 0,
						boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
						zIndex: 3,
					}}
				>
					<Sidebar />
				</Sider>
				<Layout
					style={{
						marginTop: '48px',
						marginLeft: '220px',
						backgroundColor: 'white',
					}}
				>
					<Outlet />
				</Layout>
			</Layout>
		</Layout>
	)
}

export default ContentPage
