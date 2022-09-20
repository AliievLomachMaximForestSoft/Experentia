import React from 'react'
const SideBarIcon = ({ name }) => {
	return (
		<img
			style={{ marginRight: '12px' }}
			src={`assets/sider/${name}.svg`}
			alt={'name'}
			width='22px'
			height='22px'
		/>
	)
}

export default SideBarIcon
