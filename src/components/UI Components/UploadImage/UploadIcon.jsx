import React, { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Spin, Upload } from 'antd'

const UploadImage = (props) => {
	const [fileList, setFileList] = useState([])

	useEffect(() => {
		if (props.udate) {
			props.url
				? setFileList([
						{
							uid: '-1',
							name: props.url,
							status: 'done',
							url: props.url,
						},
				  ])
				: setFileList([])
		} else {
			setFileList([])
		}
	}, [props.url])

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
		props.onChange(newFileList[0].originFileObj)
	}

	const onPreview = async (file) => {
		let src = await props.iconUrl
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj)

				reader.onload = () => resolve(reader.result)
			})
		}
	}

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok')
		}, 0)
	}

	return (
		<Spin
			spinning={props.loadingIcon ? props.loadingIcon : false}
			style={{ width: props.width }}
		>
			<Upload
				className={
					props.data === 'logo'
						? 'logo-up'
						: props.data === 'image'
						? 'notification-up'
						: ''
				}
				accept='.jpg, .jpeg, .png'
				listType='picture-card'
				fileList={fileList}
				onChange={onChange}
				onPreview={onPreview}
				showUploadList={{ showPreviewIcon: false }}
				customRequest={dummyRequest}
			>
				{fileList.length < 1 && <UploadOutlined />}
			</Upload>
		</Spin>
	)
}

export default UploadImage
