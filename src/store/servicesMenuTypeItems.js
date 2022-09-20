import { authorizationToken } from '../utils/token'
const GET_MENU_ITEMS = 'GET_MENU_ITEMS'
const LOADING_MENU_ITEMS = 'LOADING_MENU_ITEMS'
const LOADING_ICON = 'LOADING_ICON'
const SET_ICON_URL = 'SET_ICON_URL'
const DELL_MENU_ITEM = 'DELL_MENU_ITEM'
const IS_CREATE_MENU_ITEM = 'IS_CREATE_MENU_ITEM'
const IS_UPDATE_MENU_ITEM = 'IS_UPDATE_MENU_ITEM'
const IS_UPDATE_INDEX_MENU_ITEMS = 'IS_UPDATE_INDEX_MENU_ITEMS'
const IS_ICON_UPLOAD = 'IS_ICON_UPLOAD'

const URL = process.env.REACT_APP_URL

export const getAllMenuItems = (id) => {
	return async (dispatch) => {
		dispatch(loadingMenuItems(true))
		const url = `${URL}/admin/services/menu/items/${id}`

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
				.then((items) => {
					dispatch(getMenuItems(items))
					dispatch(isCreateMenuItem(false))
					dispatch(isUpdateMenuItem(false))
					dispatch(loadingMenuItems(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingMenuItems(false))
		}
	}
}

export const createMenuItem = (data) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/items`

		try {
			fetch(url, {
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
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					} else {
						dispatch(isCreateMenuItem(true))
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingMenuItems(false))
		}
	}
}

export const updateMenuItem = (data) => {
	return async (dispatch) => {
		dispatch(loadingMenuItems(true))
		const url = `${URL}/admin/services/menu/item`

		try {
			fetch(url, {
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
					dispatch(isUpdateMenuItem(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			dispatch(loadingMenuItems(false))
		}
	}
}

export const updateIndexMenuItems = (data, value) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/items/order`

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
					if (!value) dispatch(isUpdateIndexMenuItem(true))
					return res.json()
				})
				.then(() => {
					dispatch(isUpdateIndexMenuItem(false))
					dispatch(deleteMenuItem(false))
				})
		} catch (error) {
			dispatch(loadingMenuItems(false))
		}
	}
}

export const sendIcon = (icon, item, update) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/items/images`
		dispatch(loadingMenuItems(true))
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
					if (update) {
						dispatch(
							updateMenuItem({ ...item, image: res === '{}' ? null : res })
						)
					} else {
						dispatch(
							createMenuItem({ ...item, image: res === '{}' ? null : res })
						)
					}
				})
		} catch (error) {}
	}
}

export const dellMenuItem = (id, message) => {
	return async (dispatch) => {
		dispatch(loadingMenuItems(true))
		const url = `${URL}/admin/services/menu/item${id}`
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
				.then((res) => {
					return res.json()
				})
				.then((res) => {
					if (res.statusCode === 500) {
						message()
						dispatch(loadingMenuItems(false))
					} else {
						console.log('res', res)
						dispatch(deleteMenuItem(true))
						dispatch(loadingMenuItems(false))
					}
				})
		} catch (error) {
			dispatch(loadingMenuItems(false))
		}
	}
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

const isUpdateIndexMenuItem = (items) => ({
	type: IS_UPDATE_INDEX_MENU_ITEMS,
	payload: items,
})

const InitialState = {
	menuItems: '',
	deleteMenuItems: false,
	isCreateMenuItems: false,
	isUpdateMenuItems: false,
	isUpdateIndexMenuItems: false,
	loading: false,
}

export const categoryMenuItemsReducer = (state = InitialState, action) => {
	switch (action.type) {
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
