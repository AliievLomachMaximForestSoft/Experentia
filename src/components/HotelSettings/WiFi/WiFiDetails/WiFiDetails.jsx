import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Modal,
	ConfigProvider,
	DatePicker,
} from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
const { RangePicker } = DatePicker
const dateFormat = 'D,DD.MM.YYYY'
const KEY = process.env.REACT_APP_MAPS_KEY

const WiFiDetails = (props) => {
	const { t } = useTranslation()
	const { local } = useSelector((state) => state.local)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	const show = () => {
		setIsModalVisible(true)
	}

	return (
		<>
			<Button
				style={{ padding: 0, marginLeft: 12 }}
				type='text'
				onClick={() => {
					props.show ? props.show(props.record) : show()
				}}
			>
				<img src='/assets/action/Dish.svg' alt='' />
			</Button>
			{props.record && (
				<Modal
					title={props.record.room || 'undefined'}
					visible={isModalVisible}
					onCancel={handleCancel}
					width={572}
					bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
					footer={null}
				>
					<Row>
						<Col span={24}>
							<Form
								colon={true}
								name='basic'
								initialValues={{ remember: true }}
								autoComplete='off'
								layout='vertical'
							>
								<Form.Item
									label={t('properties.titleForName')}
									name='user'
									style={{ marginTop: 14 }}
								>
									<Input defaultValue={props.record.name} />
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	)
}

export default WiFiDetails
