import { dellAxios, getAxios, postAxios, putAxios } from '../utils/axios'

const GET_WIFIS = 'GET_WIFIS'
const DELL_WIFIS = 'DELL_WIFIS'

const LOADING_WIFIS = 'LOADING_WIFIS'

const IS_CREATE_WIFIS = 'IS_CREATE_WIFIS'
const IS_UPDATE_WIFIS = 'IS_UPDATE_WIFIS'

const URL = process.env.REACT_APP_URL

export const getAllWiFis = () => async (dispatch) => {
	dispatch(loadingWiFis(true))
	const url = `${URL}/admin/settings/wifis`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getWiFis(response.data))
		dispatch(isCreateWiFis(false))
		dispatch(isUpdateWiFis(false))
		dispatch(deleteWiFis(false))
	}
	dispatch(loadingWiFis(false))
}

export const createWiFi = (data) => async (dispatch) => {
	dispatch(loadingWiFis(true))
	const url = `${URL}/admin/settings/wifis`
	const response = await postAxios(url, data, dispatch)
	response && dispatch(isCreateWiFis(true))
}

export const updateWiFi = (data) => async (dispatch) => {
	dispatch(loadingWiFis(true))
	const url = `${URL}/admin/settings/wifi`
	const response = await putAxios(url, data, dispatch)
	response && dispatch(isUpdateWiFis(true))
}

export const dellWiFi = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/settings/wifi${id}`
	const response = await dellAxios(url, dispatch, message)
	response && dispatch(deleteWiFis(true))
}

const loadingWiFis = (boolean) => ({
	type: LOADING_WIFIS,
	payload: boolean,
})

const getWiFis = (wifis) => ({
	type: GET_WIFIS,
	payload: wifis,
})

const deleteWiFis = (deleteWiFis) => ({
	type: DELL_WIFIS,
	payload: deleteWiFis,
})

const isCreateWiFis = (isCreateWiFis) => ({
	type: IS_CREATE_WIFIS,
	payload: isCreateWiFis,
})

const isUpdateWiFis = (isUpdateWiFis) => ({
	type: IS_UPDATE_WIFIS,
	payload: isUpdateWiFis,
})

const InitialState = {
	wifis: '',
	deleteWiFis: false,
	isCreateWiFis: false,
	isUpdateWiFis: false,
	loading: false,
}

export const wifisReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_WIFIS:
			return { ...state, wifis: action.payload, loading: false }
		case DELL_WIFIS:
			return { ...state, deleteWiFis: action.payload, loading: false }
		case IS_CREATE_WIFIS:
			return { ...state, isCreateWiFis: action.payload, loading: false }
		case IS_UPDATE_WIFIS:
			return { ...state, isUpdateWiFis: action.payload, loading: false }
		case LOADING_WIFIS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
