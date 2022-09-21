import { dellAxios, getAxios, postAxios, putAxios } from '../utils/axios'

const GET_ADDONS = 'GET_ADDONS'
const DELL_ADDONS = 'DELL_ADDONS'

const LOADING_ADDONS = 'LOADING_ADDONS'
const FILTER_ADDONS = 'FILTER_ADDONS'
const IS_CREATE_ADDONS = 'IS_CREATE_ADDONS'
const IS_UPDATE_ADDONS = 'IS_UPDATE_ADDONS'

const URL = process.env.REACT_APP_URL

export const getAllAddons = (page, pageSize) => async (dispatch) => {
	dispatch(loadingAddons(true))
	const url =
		page && pageSize
			? `${URL}/admin/services/addons?page=${page}&limit=${pageSize}`
			: `${URL}/admin/services/addons?page=1&limit=30`
	const response = await getAxios(url, dispatch)
	dispatch(getAddons(response.data))
	dispatch(isCreateAddons(false))
	dispatch(isUpdateAddons(false))
	dispatch(deleteAddons(false))
	dispatch(loadingAddons(false))
}

export const createAddons = (data) => async (dispatch) => {
	dispatch(loadingAddons(true))
	const url = `${URL}/admin/services/addons`
	await postAxios(url, data, dispatch)
	dispatch(isCreateAddons(true))
	dispatch(loadingAddons(false))
}

export const updateAddon = (data) => async (dispatch) => {
	dispatch(loadingAddons(true))
	const url = `${URL}/admin/services/addon`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateAddons(true))
	dispatch(loadingAddons(false))
}

export const dellAddon = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/services/addon${id}`
	await dellAxios(url, dispatch, message)
	dispatch(deleteAddons(true))
}

const loadingAddons = (boolean) => ({
	type: LOADING_ADDONS,
	payload: boolean,
})

const getAddons = (addons) => ({
	type: GET_ADDONS,
	payload: addons,
})

const deleteAddons = (deleteAddons) => ({
	type: DELL_ADDONS,
	payload: deleteAddons,
})

const isCreateAddons = (isCreateAddons) => ({
	type: IS_CREATE_ADDONS,
	payload: isCreateAddons,
})

const isUpdateAddons = (isUpdateAddons) => ({
	type: IS_UPDATE_ADDONS,
	payload: isUpdateAddons,
})

export const filterAddons = (value) => ({
	type: FILTER_ADDONS,
	payload: value,
})

const InitialState = {
	addons: [],
	addonsFiltered: [],
	deleteAddons: false,
	isCreateAddons: false,
	isUpdateAddons: false,
	loading: false,
}

export const addonsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case FILTER_ADDONS: {
			return {
				...state,
				addonsFiltered: state.addons.items.filter((e) => {
					return e.name.toLowerCase().startsWith(action.payload.toLowerCase())
				}),
				loading: false,
			}
		}
		case GET_ADDONS:
			return { ...state, addons: action.payload, loading: false }
		case DELL_ADDONS:
			return { ...state, deleteAddons: action.payload, loading: false }
		case IS_CREATE_ADDONS:
			return { ...state, isCreateAddons: action.payload, loading: false }
		case IS_UPDATE_ADDONS:
			return { ...state, isUpdateAddons: action.payload, loading: false }
		case LOADING_ADDONS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
