import { authorizationToken } from '../utils/token'
const ERROR_PROPERTIES = 'ERROR_PROPERTIES'
const SET_PROPERTY = 'SET_PROPERTY'
const SET_GALERY_URL = 'SET_GALERY_URL'
const SET_LOGO_URL = 'SET_LOGO_URL'

const LOADING_PROPERTIES = 'LOADING_PROPERTIES'
const LOADING_DETAILS_PROPERTY = 'LOADING_DETAILS_PROPERTY'
const LOADING_IMAGE = 'LOADING_IMAGE'

const IS_UPDATE_PROPERTY = 'IS_UPDATE_PROPERTY'
const IS_UPLOAD_GALERY = 'IS_UPLOAD_GALERY'

const SET_COUNRIES = 'SET_COUNRIES'
const SET_NAME = 'SET_NAME'

const URL = process.env.REACT_APP_URL

export const getProperty = () => {
	return async (dispatch) => {
		const url = `${URL}/admin/property`

		dispatch(loadingDetailsProperty(true))
		try {
			fetch(url, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					dispatch(setNameAdmin(response.name))
					dispatch(setProperty(response.property))
					dispatch(loadingDetailsProperty(false))
					dispatch(isUpdateProperty(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingDetailsProperty(false))
			dispatch(isUpdateProperty(false))
		}
	}
}

export const getCountries = () => {
	return async (dispatch) => {
		dispatch(loadingProperties(true))
		const url = `${URL}/superadmin/countries`

		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
					dispatch(setCountries(res))
					dispatch(loadingProperties(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingProperties(false))
			dispatch(errorProperties('error'))
		}
	}
}

export const updateProperties = (data) => {
	return async (dispatch) => {
		dispatch(loadingProperties(true))
		const url = `${URL}/admin/property`
		try {
			const response = fetch(url, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${authorizationToken}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.status === 200 || res.status === 201)
						dispatch(isUpdateProperty(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingProperties(false))
			dispatch(errorProperties('error'))
		}
	}
}

export const sendGalery = (galery) => {
	return async (dispatch) => {
		const url = `${URL}/superadmin/servicemaster/upload/icon`
		let count = 0
		let arrLink = []
		let data = []
		dispatch(loadImage(true))
		try {
			galery.map(async (icon) => {
				if (icon.originFileObj) {
					data = new FormData()
					data.append('file', icon.originFileObj)

					const res = await fetch(url, {
						method: 'POST',
						mode: 'cors',
						headers: {
							accept: 'application/json',
							Authorization: `Bearer ${authorizationToken}`,
						},
						credentials: 'include',
						body: data,
					})
					const link = await res.text()
					count++
					dispatch(setGaleryUrl(link))
					arrLink.push(link)
				} else {
					const link = icon.name
						.replace(`${URL}/files/`, '')
						.replaceAll('%2F', '/')
					count++
					dispatch(setGaleryUrl(link))
					arrLink.push(link)
				}
				if (count === galery.length) {
					dispatch(loadImage(false))
					dispatch(isUploadGalery(arrLink))
				}
			})
		} catch (error) {
			console.log('error', error)
			dispatch(loadImage(false))
			dispatch(isUploadGalery([]))
		}
	}
}

export const sendLogo = (icon) => {
	return async (dispatch) => {
		const url = `${URL}/superadmin/servicemaster/upload/icon`

		const data = new FormData()
		data.append('file', icon)
		try {
			fetch(url, {
				method: 'POST',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
				body: data,
			})
				.then((res) => {
					return res.text()
				})
				.then((res) => {
					dispatch(setLogoURL(res))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

const setLogoURL = (url) => ({
	type: SET_LOGO_URL,
	payload: url,
})

const setGaleryUrl = (url) => ({
	type: SET_GALERY_URL,
	payload: url,
})

const loadImage = (boolean) => {
	return {
		type: LOADING_IMAGE,
		payload: boolean,
	}
}

const loadingDetailsProperty = (boolean) => {
	return {
		type: LOADING_DETAILS_PROPERTY,
		payload: boolean,
	}
}

const loadingProperties = (boolean) => {
	return {
		type: LOADING_PROPERTIES,
		payload: boolean,
	}
}

const setCountries = (countries) => ({
	type: SET_COUNRIES,
	payload: countries,
})

const isUpdateProperty = (isUpdateProperty) => ({
	type: IS_UPDATE_PROPERTY,
	payload: isUpdateProperty,
})

export const isUploadGalery = (boolean) => ({
	type: IS_UPLOAD_GALERY,
	payload: boolean,
})

const errorProperties = (textError) => ({
	type: ERROR_PROPERTIES,
	payload: textError,
})

export const setProperty = (property) => ({
	type: SET_PROPERTY,
	payload: property,
})

const setNameAdmin = (name) => ({
	type: SET_NAME,
	payload: name,
})

const InitialState = {
	countries: [], ///
	nameAdmin: '',
	property: '',
	galeryUrl: '',
	logoUrl: '',
	loadingImage: false,
	galeryArray: [],
	isUpdateProperty: false, ///
	error: '', ///
	loading: false, ///
}

export const propertiesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case SET_PROPERTY:
			return { ...state, property: action.payload }
		case SET_NAME:
			return { ...state, nameAdmin: action.payload }
		case SET_GALERY_URL:
			return { ...state, galeryUrl: action.payload, loading: false }
		case SET_LOGO_URL:
			return { ...state, logoUrl: action.payload, loading: false }
		case SET_COUNRIES:
			return { ...state, countries: action.payload, loading: false }
		case IS_UPDATE_PROPERTY:
			return { ...state, isUpdateProperty: action.payload, loading: false }
		case IS_UPLOAD_GALERY:
			return { ...state, galeryArray: action.payload, loading: false }
		case ERROR_PROPERTIES:
			return { ...state, error: action.payload }
		case LOADING_IMAGE:
			return { ...state, loadingImage: action.payload }
		default:
			return state
	}
}
