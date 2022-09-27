import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'
const GET_MENU_ITEMS = 'GET_MENU_ITEMS'
const LOADING_MENU_ITEMS = 'LOADING_MENU_ITEMS'
const DELL_MENU_ITEM = 'DELL_MENU_ITEM'
const IS_CREATE_MENU_ITEM = 'IS_CREATE_MENU_ITEM'
const IS_UPDATE_MENU_ITEM = 'IS_UPDATE_MENU_ITEM'
const IS_UPDATE_INDEX_MENU_ITEMS = 'IS_UPDATE_INDEX_MENU_ITEMS'
const INDEX_DEL_MENU_ITEM = 'INDEX_DEL_MENU_ITEM'

const URL = process.env.REACT_APP_URL

export const getAllMenuItems = (id) => async (dispatch) => {
	dispatch(loadingMenuItems(true))
	const url = `${URL}/admin/services/menu/items/${id}`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getMenuItems(response.data))
		dispatch(isCreateMenuItem(false))
		dispatch(isUpdateMenuItem(false))
	}
	dispatch(loadingMenuItems(false))
}

export const createMenuItem = (data) => async (dispatch) => {
	const url = `${URL}/admin/services/menu/items`
	const response = await postAxios(url, data, dispatch)
	response && dispatch(isCreateMenuItem(true))
}

export const updateMenuItem = (data) => async (dispatch) => {
	dispatch(loadingMenuItems(true))
	const url = `${URL}/admin/services/menu/item`
	const response = await putAxios(url, data, dispatch)
	response && dispatch(isUpdateMenuItem(true))
}

export const updateIndexMenuItems = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/services/menu/items/order`
	const response = await patchAxios(url, data, dispatch)
	if (!value && response) dispatch(isUpdateIndexMenuItem(true))
	dispatch(deleteMenuItem(false))
}

export const sendIcon = (icon, item, update) => async (dispatch) => {
	const url = `${URL}/admin/services/menu/items/images`
	dispatch(loadingMenuItems(true))
	const data = new FormData()
	data.append('file', icon)
	const response = await postAxios(url, data, dispatch)
	if (response) {
		if (update) {
			dispatch(
				updateMenuItem({
					...item,
					image: response.data === '{}' ? null : response.data,
				})
			)
		} else {
			dispatch(
				createMenuItem({
					...item,
					image: response.data === '{}' ? null : response.data,
				})
			)
		}
	}
}

export const dellMenuItem = (id, message) => async (dispatch) => {
	dispatch(loadingMenuItems(true))
	const url = `${URL}/admin/services/menu/item${id}`
	const response = await dellAxios(url, dispatch, message)
	response && dispatch(deleteMenuItem(true))
	dispatch(loadingMenuItems(false))
}

const loadingMenuItems = (boolean) => ({
	type: LOADING_MENU_ITEMS,
	payload: boolean,
})

const getMenuItems = (items) => ({
	type: GET_MENU_ITEMS,
	payload: items,
})

const deleteMenuItem = (item) => ({
	type: DELL_MENU_ITEM,
	payload: item,
})

const isCreateMenuItem = (item) => ({
	type: IS_CREATE_MENU_ITEM,
	payload: item,
})

const isUpdateMenuItem = (item) => ({
	type: IS_UPDATE_MENU_ITEM,
	payload: item,
})

export const isUpdateIndexMenuItem = (items) => ({
	type: IS_UPDATE_INDEX_MENU_ITEMS,
	payload: items,
})

export const setIndexDel = (index) => ({
	type: INDEX_DEL_MENU_ITEM,
	payload: index,
})

const InitialState = {
	menuItems: '',
	deleteMenuItems: false,
	isCreateMenuItems: false,
	isUpdateMenuItems: false,
	isUpdateIndexMenuItems: false,
	loading: false,
	indexDelItem: null,
}

export const categoryMenuItemsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case INDEX_DEL_MENU_ITEM:
			return { ...state, indexDelItem: action.payload }
		case GET_MENU_ITEMS:
			return { ...state, menuItems: action.payload, loading: false }
		case DELL_MENU_ITEM:
			return { ...state, deleteMenuItems: action.payload, loading: false }
		case IS_CREATE_MENU_ITEM:
			return { ...state, isCreateMenuItems: action.payload, loading: false }
		case IS_UPDATE_MENU_ITEM:
			return { ...state, isUpdateMenuItems: action.payload, loading: false }
		case IS_UPDATE_INDEX_MENU_ITEMS:
			return {
				...state,
				isUpdateIndexMenuItems: action.payload,
				loading: false,
			}
		case LOADING_MENU_ITEMS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
