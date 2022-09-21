import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'
const GET_STANDART_ITEMS = 'GET_STANDART_ITEMS'
const DELL_STANDART_ITEMS = 'DELL_STANDART_ITEMS'
const IS_CREATE_STANDART_ITEM = 'IS_CREATE_STANDART_ITEM'
const IS_UPDATE_STANDART_ITEM = 'IS_UPDATE_STANDART_ITEM'
const IS_UPDATE_INDEX_STANDART_ITEMS = 'IS_UPDATE_INDEX_STANDART_ITEMS'
const LOADING_STANDART_ITEMS = 'LOADING_STANDART_ITEMS'
const URL = process.env.REACT_APP_URL

export const getAllStandartItems = (id) => async (dispatch) => {
	dispatch(loadingStandartItems(true))
	const url = `${URL}/admin/services/standart/${id}`
	const response = await getAxios(url, dispatch)
	dispatch(getStandartItems(response.data))
	dispatch(isCreateStandartItem(false))
	dispatch(isUpdateStandartItem(false))
	dispatch(loadingStandartItems(false))
}

export const createStandart = (data) => async (dispatch) => {
	dispatch(loadingStandartItems(true))
	const url = `${URL}/admin/services/standart`
	await postAxios(url, data, dispatch)
	dispatch(isCreateStandartItem(true))
	dispatch(loadingStandartItems(false))
}

export const updateStandartItem = (data) => async (dispatch) => {
	dispatch(loadingStandartItems(true))
	const url = `${URL}/admin/services/standart`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateStandartItem(true))
}

export const dellStandartItem = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/services/standart${id}`
	await dellAxios(url, dispatch, message)
	dispatch(deleteStandartItems(true))
}

export const updateIndexStandartItems = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/services/standart/order`
	await patchAxios(url, data, dispatch)
	if (!value) dispatch(isUpdateIndexStandartItems(true))
	dispatch(deleteStandartItems(false))
	dispatch(isUpdateIndexStandartItems(false))
}

const loadingStandartItems = (boolean) => ({
	type: LOADING_STANDART_ITEMS,
	payload: boolean,
})

const getStandartItems = (standartItems) => ({
	type: GET_STANDART_ITEMS,
	payload: standartItems,
})

const deleteStandartItems = (deleteStandartItem) => ({
	type: DELL_STANDART_ITEMS,
	payload: deleteStandartItem,
})

const isCreateStandartItem = (isCreateStandartItem) => ({
	type: IS_CREATE_STANDART_ITEM,
	payload: isCreateStandartItem,
})

const isUpdateStandartItem = (isUpdateStandartItem) => ({
	type: IS_UPDATE_STANDART_ITEM,
	payload: isUpdateStandartItem,
})

const isUpdateIndexStandartItems = (standartItems) => ({
	type: IS_UPDATE_INDEX_STANDART_ITEMS,
	payload: standartItems,
})

const InitialState = {
	standartItems: '',
	standartItemsSearch: '',
	deleteStandartItems: false,
	isUpdateStandartItems: false,
	isCreateStandartItems: false,
	isUpdateIndexStandartItems: false,
	loading: false,
}

export const standartItemsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_STANDART_ITEMS:
			return { ...state, standartItems: action.payload, loading: false }
		case DELL_STANDART_ITEMS:
			return { ...state, deleteStandartItems: action.payload, loading: false }
		case IS_CREATE_STANDART_ITEM:
			return { ...state, isCreateStandartItems: action.payload, loading: false }
		case IS_UPDATE_STANDART_ITEM:
			return { ...state, isUpdateStandartItems: action.payload, loading: false }
		case IS_UPDATE_INDEX_STANDART_ITEMS:
			return {
				...state,
				isUpdateIndexStandartItems: action.payload,
				loading: false,
			}
		case LOADING_STANDART_ITEMS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
