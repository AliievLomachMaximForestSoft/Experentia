import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'

const GET_SERVICES = 'GET_SERVICES'
const LOADING_SERVOCES = 'LOADING_SERVOCES'
const LOADING_DETAILS_SERVICE = 'LOADING_DETAILS_SERVICE'
const LOADING_ICON = 'LOADING_ICON'
const LOADING_BACKGROUND = 'LOADING_BACKGROUND'
const GET_SERVICE = 'GET_SERVICE'
const SET_ICON_URL = 'SET_ICON_URL'
const SET_BACKGROUND_URL = 'SET_BACKGROUND_URL'
const DELL_SERVICE = 'DELL_SERVICE'
const IS_CREATE_SERVICE = 'IS_CREATE_SERVICE'
const IS_UPDATE_SERVICE = 'IS_UPDATE_SERVICE'
const IS_UPDATE_INDEX_SERVICES = 'IS_UPDATE_INDEX_SERVICES'
const IS_ICON_UPLOAD = 'IS_ICON_UPLOAD'
const IS_BACKGROUND_UPLOAD = 'IS_BACKGROUND_UPLOAD'
const INDEX_DEL_SERVICE = 'INDEX_DEL_SERVICE'

const URL = process.env.REACT_APP_URL

export const getAllServices = () => async (dispatch) => {
	dispatch(loadingServices(true))
	const url = `${URL}/admin/property/services`
	const response = await getAxios(url, dispatch)
	dispatch(getServices(response.data))
	dispatch(isCreateService(false))
	dispatch(isUpdateService(false))
	dispatch(loadingServices(false))
	dispatch(setBackgroundURL('undefined'))
	dispatch(setIconURL('undefined'))
}

export const createService = (data) => async (dispatch) => {
	dispatch(loadingServices(true))
	const url = `${URL}/admin/property/services`
	await postAxios(url, data, dispatch)
	dispatch(isCreateService(true))
}

export const updateService = (data) => {
	if (data.abilityToSetTime.length === 0) data.abilityToSetTime = ['no']
	return async (dispatch) => {
		dispatch(loadingServices(true))
		const url = `${URL}/admin/property/service`
		await putAxios(url, data, dispatch)
		dispatch(isUpdateService(true))
		dispatch(loadingServices(false))
	}
}

export const updateIndexServices = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/property/services/order`
	const response = await patchAxios(url, data, dispatch)
	if (!value) dispatch(isUpdateIndexServices(true))
	dispatch(getServices(response.data))
	dispatch(isUpdateIndexServices(false))
	dispatch(deleteService(false))
}

export const sendBackground = (background) => async (dispatch) => {
	const url = `${URL}/admin/property/service/upload/icon`
	dispatch(loadingBackground(true))
	const data = new FormData()
	data.append('file', background)
	const response = await postAxios(url, data, dispatch)
	dispatch(setBackgroundURL(response.data))
	dispatch(isBackgroundUpload(true))
	dispatch(loadingBackground(false))
}

export const sendIcon = (icon) => async (dispatch) => {
	const url = `${URL}/admin/property/service/upload/icon`
	dispatch(loadIcon(true))
	const data = new FormData()
	data.append('file', icon)
	const response = await postAxios(url, data, dispatch)
	dispatch(setIconURL(response.data))
	dispatch(isIconUpload(true))
	dispatch(loadIcon(false))
}

export const getServicesDetails = (id) => async (dispatch) => {
	dispatch(loadingDetailsService(true))
	const url = `${URL}/superadmin/servicemaster${id}`
	const response = await getAxios(url, dispatch)
	dispatch(getService(response.data))
	dispatch(loadingDetailsService(false))
}

export const dellService = (id, message) => async (dispatch) => {
	dispatch(loadingServices(true))
	const url = `${URL}/admin/property/service${id}`
	await dellAxios(url, dispatch,message)
	dispatch(deleteService(true))
	dispatch(loadingServices(false))
}

const loadingServices = (boolean) => ({
	type: LOADING_SERVOCES,
	payload: boolean,
})

const loadingDetailsService = (boolean) => ({
	type: LOADING_DETAILS_SERVICE,
	payload: boolean,
})

export const loadIcon = (boolean) => ({
	type: LOADING_ICON,
	payload: boolean,
})

const loadingBackground = (boolean) => ({
	type: LOADING_BACKGROUND,
	payload: boolean,
})

const setIconURL = (url) => ({
	type: SET_ICON_URL,
	payload: url,
})

const setBackgroundURL = (url) => ({
	type: SET_BACKGROUND_URL,
	payload: url,
})

const getServices = (services) => ({
	type: GET_SERVICES,
	payload: services,
})

const getService = (service) => ({
	type: GET_SERVICE,
	payload: service,
})

const deleteService = (deleteService) => ({
	type: DELL_SERVICE,
	payload: deleteService,
})

const isCreateService = (isCreateService) => ({
	type: IS_CREATE_SERVICE,
	payload: isCreateService,
})

const isUpdateService = (isUpdateService) => ({
	type: IS_UPDATE_SERVICE,
	payload: isUpdateService,
})

const isUpdateIndexServices = (service) => ({
	type: IS_UPDATE_INDEX_SERVICES,
	payload: service,
})

const isIconUpload = (boolean) => ({
	type: IS_ICON_UPLOAD,
	payload: boolean,
})

const isBackgroundUpload = (boolean) => ({
	type: IS_BACKGROUND_UPLOAD,
	payload: boolean,
})

export const indexDelItemService = (index) => ({
	type: INDEX_DEL_SERVICE,
	payload: index,
})

const InitialState = {
	services: '',
	serviceDatails: '',
	iconUrl: '',
	backgroundUrl: '',
	deleteService: false,
	isCreateService: false,
	isUpdateService: false,
	isUpdateIndexServices: false,
	loading: false,
	loadingDetails: false,
	loadingIcon: false,
	loadingBackground: false,
	isIconUpload: false,
	isBackgroundUpload: false,
	indexDelItem: null,
}

export const servicesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_SERVICES:
			return { ...state, services: action.payload, loading: false }
		case GET_SERVICE:
			return { ...state, serviceDatails: action.payload, loading: false }
		case SET_ICON_URL:
			return { ...state, iconUrl: action.payload, loading: false }
		case SET_BACKGROUND_URL:
			return { ...state, backgroundUrl: action.payload, loading: false }
		case DELL_SERVICE:
			return { ...state, deleteService: action.payload, loading: false }
		case IS_CREATE_SERVICE:
			return { ...state, isCreateService: action.payload, loading: false }
		case IS_UPDATE_SERVICE:
			return { ...state, isUpdateService: action.payload, loading: false }
		case IS_ICON_UPLOAD:
			return { ...state, isIconUpload: action.payload, loading: false }
		case INDEX_DEL_SERVICE:
			return { ...state, indexDelItem: action.payload }
		case IS_UPDATE_INDEX_SERVICES:
			return {
				...state,
				isUpdateIndexServices: action.payload,
				loading: false,
			}
		case LOADING_SERVOCES:
			return { ...state, loading: action.payload }
		case LOADING_ICON:
			return { ...state, loadingIcon: action.payload }
		case LOADING_BACKGROUND:
			return { ...state, loadingBackground: action.payload }
		case LOADING_DETAILS_SERVICE:
			return { ...state, loadingDetails: action.payload }
		default:
			return state
	}
}
