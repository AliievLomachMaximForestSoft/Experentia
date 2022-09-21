import { getAxios, postAxios, putAxios } from '../utils/axios'

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

export const getProperty = () => async (dispatch) => {
	const url = `${URL}/admin/property`
	dispatch(loadingDetailsProperty(true))
	const response = await getAxios(url, dispatch)
	dispatch(setNameAdmin(response.data.name))
	dispatch(setProperty(response.data.property))
	dispatch(loadingDetailsProperty(false))
	dispatch(isUpdateProperty(false))
}

export const getCountries = () => async (dispatch) => {
	dispatch(loadingProperties(true))
	const url = `${URL}/admin/countries`
	const response = await getAxios(url, dispatch)
	dispatch(setCountries(response.data))
	dispatch(loadingProperties(false))
}

export const updateProperties = (data) => async (dispatch) => {
	dispatch(loadingProperties(true))
	const url = `${URL}/admin/property`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateProperty(true))
}

export const sendGalery = (galery) => async (dispatch) => {
	const url = `${URL}/admin/servicemaster/upload/icon`
	let count = 0
	let arrLink = []
	let data = []
	dispatch(loadImage(true))
	galery.map(async (icon) => {
		if (icon.originFileObj) {
			data = new FormData()
			data.append('file', icon.originFileObj)
			const response = await postAxios(url, data, dispatch)
			const link = response.data
			count++
			dispatch(setGaleryUrl(link))
			arrLink.push(link)
		} else {
			const link = icon.name.replace(`${URL}/files/`, '').replaceAll('%2F', '/')
			count++
			dispatch(setGaleryUrl(link))
			arrLink.push(link)
		}
		if (count === galery.length) {
			dispatch(loadImage(false))
			dispatch(isUploadGalery(arrLink))
		}
	})
}

export const sendLogo = (icon) => async (dispatch) => {
	const url = `${URL}/admin/servicemaster/upload/icon`
	const data = new FormData()
	data.append('file', icon)
	const response = await postAxios(url, data, dispatch)
	dispatch(setLogoURL(response.data))
}

const setLogoURL = (url) => ({
	type: SET_LOGO_URL,
	payload: url,
})

const setGaleryUrl = (url) => ({
	type: SET_GALERY_URL,
	payload: url,
})

const loadImage = (boolean) => ({
	type: LOADING_IMAGE,
	payload: boolean,
})

const loadingDetailsProperty = (boolean) => ({
	type: LOADING_DETAILS_PROPERTY,
	payload: boolean,
})

const loadingProperties = (boolean) => ({
	type: LOADING_PROPERTIES,
	payload: boolean,
})

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

export const setProperty = (property) => ({
	type: SET_PROPERTY,
	payload: property,
})

const setNameAdmin = (name) => ({
	type: SET_NAME,
	payload: name,
})

const InitialState = {
	countries: [],
	nameAdmin: '',
	property: '',
	galeryUrl: '',
	logoUrl: '',
	loadingImage: false,
	galeryArray: [],
	isUpdateProperty: false,
	loading: false,
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
		case LOADING_IMAGE:
			return { ...state, loadingImage: action.payload }
		default:
			return state
	}
}
