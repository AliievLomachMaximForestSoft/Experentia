import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Col, Layout, Row, Select } from 'antd'
import { isAuthUser } from '../../store/login'
import enUS from 'antd/lib/locale/en_US'
import hiIN from 'antd/lib/locale/hi_IN'
import { getLocal } from '../../store/local'
import { getProperty } from '../../store/properties'
const { Option } = Select
const { Header } = Layout

const HeaderMain = () => {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		dispatch(getProperty())
	}, [])

	const { property } = useSelector((state) => state.properties)

	const changeLanguage = (language) => {
		i18n.changeLanguage(language)
		if (language === 'en') {
			dispatch(getLocal(enUS))
		} else if (language === 'hi') {
			dispatch(getLocal(hiIN))
		}
	}

	const out = () => {
		dispatch(isAuthUser(false))
		localStorage.setItem('remember', false)
	}

	return (
		<Header
			style={{
				position: 'fixed',
				zIndex: '4',
				padding: '0px 16px',
				height: '48px',
				width: '100%',
				flex: 'space-between',
				boxShadow: '0px 2px 8px #F0F1F2',
				backgroundColor: '#568159',
				lineHeight: '48px',
			}}
		>
			<Row justify='space-between' style={{ margin: 0 }}>
				<Col
					style={{
						color: '#FFF',
					}}
				>
					<img
						style={{ width: '32px', marginRight: 14 }}
						src={'assets/header/logo.svg'}
					/>
					{t('header.experentia')}
				</Col>
				<Col
					style={{
						color: '#FFF',
					}}
				>
					<img
						style={{ marginRight: 12, marginLeft: 44, marginBottom: 4 }}
						src={'assets/header/location.svg'}
					/>
					{property.name}
				</Col>
				<Col
					style={{
						paddingRight: 0,
					}}
				>
					<Select
						style={{ textAlign: 'center' }}
						bordered={false}
						defaultValue={i18n.language}
						suffixIcon={''}
						dropdownStyle={{ textAlign: 'center' }}
					>
						<Option id={1} value='en'>
							<a onClick={() => changeLanguage('en')}>
								<img src='/assets/language/us.png' style={{ width: 22 }} />
							</a>
						</Option>

						<Option value='hi'>
							<a onClick={() => changeLanguage('hi')}>
								<img src='/assets/language/indian.png' style={{ width: 22 }} />
							</a>
						</Option>
					</Select>
					<Button
						type='text'
						style={{
							color: '#FFF',
						}}
						onClick={() => {
							out()
						}}
					>
						<Row justify='space-between' align='middle'>
							<Col>
								<img src='/assets/header/logOut.svg' width={'18px'} />
							</Col>
							<Col style={{ marginLeft: '10px' }}>{t('header.exit')}</Col>
						</Row>
					</Button>
				</Col>
			</Row>
		</Header>
	)
}

export default HeaderMain
