import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Spin, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const UploadImage = (props) => {
	const { t } = useTranslation()
	const [fileList, setFileList] = useState([])
	const [previewVisible, setPreviewVisible] = useState(false)
	const [previewImage, setPreviewImage] = useState('')

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
		let src = file.url

		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj)

				reader.onload = () => resolve(reader.result)
			})
		}

		setPreviewImage(file.url || file.preview)
		setPreviewVisible(true)
	}

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok')
		}, 0)
	}
	const handleCancel = () => setPreviewVisible(false)

	return (
		<>
			<Spin spinning={props.loadingBackground} size='large'>
				<Upload
					progress={{ type: 'line', strokeWidth: 2, showInfo: true }}
					accept='.jpg, .jpeg, .png'
					className='bgup'
					listType='picture-card'
					fileList={fileList}
					onChange={onChange}
					onPreview={onPreview}
					customRequest={dummyRequest}
					showUploadList={{ showPreviewIcon: props.udate ? true : false }}
					style={{ width: 700 }}
				>
					{fileList.length < 1 && <UploadOutlined /> &&
						t('services.placeholderForBgImg')}
				</Upload>
				<Modal
					visible={previewVisible}
					footer={null}
					onCancel={handleCancel}
					closable={false}
				>
					<img
						alt='example'
						style={{
							width: '100%',
						}}
						src={previewImage}
					/>
				</Modal>
			</Spin>
		</>
	)
}

export default UploadImage
