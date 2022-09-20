import { authorizationToken } from '../utils/token'
const GET_STANDART_ITEMS = 'GET_STANDART_ITEMS'
const GET_STANDART_ITEM = 'GET_STANDART_ITEM'
const DELL_STANDART_ITEMS = 'DELL_STANDART_ITEMS'
const IS_CREATE_STANDART_ITEM = 'IS_CREATE_STANDART_ITEM'
const IS_UPDATE_STANDART_ITEM = 'IS_UPDATE_STANDART_ITEM'
const IS_UPDATE_INDEX_STANDART_ITEMS = 'IS_UPDATE_INDEX_STANDART_ITEMS'
const LOADING_STANDART_ITEMS = 'LOADING_STANDART_ITEMS'
const URL = process.env.REACT_APP_URL

export const getAllStandartItems = (id) => (dispatch) => {
	dispatch(loadingStandartItems(true))
	const url = `${URL}/admin/services/standart/${id}`

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
			.then((standartItems) => {
				dispatch(getStandartItems(standartItems))
				dispatch(isCreateStandartItem(false))
				dispatch(isUpdateStandartItem(false))
				dispatch(loadingStandartItems(false))
			})
	} catch (error) {
		console.log('error', error)
		dispatch(loadingStandartItems(false))
	}
}

export const createStandart = (data) => {
	return async (dispatch) => {
		dispatch(loadingStandartItems(true))
		const url = `${URL}/admin/services/standart`
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
			}).then((res) => {
				dispatch(isCreateStandartItem(true))
				dispatch(loadingStandartItems(false))
				return res.json()
			})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingStandartItems(false))
		}
	}
}

export const updateStandartItem = (data) => {
	return async (dispatch) => {
		dispatch(loadingStandartItems(true))
		const url = `${URL}/admin/services/standart`
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
					return res.json()
				})
				.then((res) => {
					dispatch(isUpdateStandartItem(true))
				})
		} catch (error) {
			console.log('error', error)

			dispatch(loadingStandartItems(false))
		}
	}
}

export const dellStandartItem = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/standart${id}`
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
					} else {
						dispatch(deleteStandartItems(true))
					}
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

export const updateIndexStandartItems = (data, value, id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/standart/order`
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
					if (!value) dispatch(isUpdateIndexStandartItems(true))
					return res.json()
				})
				.then((res) => {
					dispatch(deleteStandartItems(false))
					dispatch(isUpdateIndexStandartItems(false))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
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
	standartItemsDatails: '',
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
		case GET_STANDART_ITEM:
			return { ...state, standartItemsDatails: action.payload, loading: false }
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
