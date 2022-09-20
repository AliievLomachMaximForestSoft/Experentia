import React, { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
const URL = process.env.REACT_APP_URL

const UploadGalery = (props) => {
	const [fileList, setFileList] = useState([])
	let count = 0

	const arrImage = props.urlArr?.gallery?.map((url) => {
		count--
		return {
			uid: count,
			name: `${URL}/files/${url.replaceAll('/', '%2F')}`,
			status: 'done',
			url: `${URL}/files/${url.replaceAll('/', '%2F')}`,
		}
	})

	useEffect(() => {
		if (props.udate) {
			props.urlArr ? setFileList(arrImage) : setFileList([])
		} else {
			setFileList([])
		}
	}, [props.urlArr])

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
		props.setGalery(newFileList)
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
		<Upload
			className={`galery-up ${
				!fileList || fileList?.length < 1 ? 'galery-up-tree' : ''
			}`}
			accept='.jpg, .jpeg, .png'
			listType='picture-card'
			fileList={fileList}
			onChange={onChange}
			onPreview={onPreview}
			showUploadList={{ showPreviewIcon: false }}
			customRequest={dummyRequest}
		>
			{(!fileList || fileList.length) < 4 && <UploadOutlined />}
		</Upload>
	)
}

export default UploadGalery
