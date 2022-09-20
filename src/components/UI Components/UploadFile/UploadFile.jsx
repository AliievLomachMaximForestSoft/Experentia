import React, { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'

const UploadFile = (props) => {
	const [fileList, setFileList] = useState([])

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok')
		}, 0)
	}

	useEffect(() => {
		props.url
			? setFileList([
					{
						uid: '-1',
						name: props.record.fileName,
						status: 'done',
						url: props.url,
					},
			  ])
			: setFileList([])
	}, [props.url])

	return (
		<Upload
			accept='.pdf'
			onRemove={(file) => {
				const index = fileList.indexOf(file)
				const newFileList = fileList.slice()
				newFileList.splice(index, 1)
				setFileList(newFileList)
			}}
			beforeUpload={(file) => {
				setFileList([...fileList, file])
				props.onChange(file, props.record.ID)
				return false
			}}
			fileList={fileList}
			customRequest={dummyRequest}
		>
			{fileList.length < 1 && (
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			)}
		</Upload>
	)
}

export default UploadFile
