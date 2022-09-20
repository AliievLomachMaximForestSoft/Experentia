import { authorizationToken } from '../utils/token'
const GET_SERVICES = 'GET_SERVICES'
const ERROR_SERVICE = 'ERROR_SERVICE'
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

export const getAllServices = () => {
	return async (dispatch) => {
		dispatch(loadingServices(true))
		const url = `${URL}/admin/property/services`

		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((services) => {
					dispatch(getServices(services))
					dispatch(errorServices(''))
					dispatch(isCreateService(false))
					dispatch(isUpdateService(false))
					dispatch(loadingServices(false))
					dispatch(setBackgroundURL('undefined'))
					dispatch(setIconURL('undefined'))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingServices(false))
			dispatch(errorServices('error'))
		}
	}
}

export const createService = (data) => {
	return async (dispatch) => {
		dispatch(loadingServices(true))
		const url = `${URL}/admin/property/services`

		try {
			const response = fetch(url, {
				method: 'POST',
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
						dispatch(isCreateService(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingServices(false))
			dispatch(errorServices('error'))
		}
	}
}

export const updateService = (data) => {
	console.log('data', data)
	if (data.abilityToSetTime.length === 0) data.abilityToSetTime = ['no']
	return async (dispatch) => {
		dispatch(loadingServices(true))
		const url = `${URL}/admin/property/service`

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
						dispatch(isUpdateService(true))
					dispatch(loadingServices(false))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingServices(false))
			dispatch(errorServices('error'))
		}
	}
}

export const updateIndexServices = (data, value) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/services/order`

		try {
			fetch(url, {
				method: 'PATCH',
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
					if (!value) dispatch(isUpdateIndexServices(true))
					return res.json()
				})
				.then((properties) => {
					dispatch(getServices(properties))
					dispatch(errorServices(''))
					dispatch(isUpdateIndexServices(false))
					dispatch(deleteService(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingServices(false))
			dispatch(errorServices('error'))
		}
	}
}

export const sendBackground = (background) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/service/upload/icon`
		dispatch(loadingBackground(true))
		const data = new FormData()
		data.append('file', background)
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
					dispatch(setBackgroundURL(res))
					dispatch(isBackgroundUpload(true))
					dispatch(loadingBackground(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(isBackgroundUpload(false))
			dispatch(loadingBackground(false))
		}
	}
}

export const sendIcon = (icon) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/service/upload/icon`
		dispatch(loadIcon(true))
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
					dispatch(setIconURL(res))
					dispatch(isIconUpload(true))
					dispatch(loadIcon(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(isIconUpload(false))
			dispatch(loadIcon(false))
		}
	}
}

export const getServicesDetails = (id) => {
	return async (dispatch) => {
		dispatch(loadingDetailsService(true))
		const url = `${URL}/superadmin/servicemaster${id}`

		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((services) => {
					dispatch(getService(services))
					dispatch(errorServices(''))
					dispatch(loadingDetailsService(false))
				})
		} catch (error) {
			dispatch(loadingDetailsService(false))
			dispatch(errorServices('error'))
		}
	}
}

export const dellService = (id, message) => {
	return async (dispatch) => {
		dispatch(loadingServices(true))
		const url = `${URL}/admin/property/service${id}` //?
		try {
			fetch(url, {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.statusCode === 500) {
						message()
						dispatch(loadingServices(false))
					} else {
						dispatch(deleteService(true))
						dispatch(errorServices(''))
					}
				})
		} catch (error) {
			dispatch(loadingServices(false))
			dispatch(errorServices('error'))
		}
	}
}

const loadingServices = (boolean) => {
	return {
		type: LOADING_SERVOCES,
		payload: boolean,
	}
}

const loadingDetailsService = (boolean) => {
	return {
		type: LOADING_DETAILS_SERVICE,
		payload: boolean,
	}
}

export const loadIcon = (boolean) => {
	return {
		type: LOADING_ICON,
		payload: boolean,
	}
}

const loadingBackground = (boolean) => {
	return {
		type: LOADING_BACKGROUND,
		payload: boolean,
	}
}

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

const errorServices = (textError) => ({
	type: ERROR_SERVICE,
	payload: textError,
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
	error: '',
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
		case ERROR_SERVICE:
			return { ...state, error: action.payload }
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
