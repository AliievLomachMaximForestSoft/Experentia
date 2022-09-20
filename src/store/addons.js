import { authorizationToken } from '../utils/token'

const GET_ADDONS = 'GET_ADDONS'
const DELL_ADDONS = 'DELL_ADDONS'

const LOADING_ADDONS = 'LOADING_ADDONS'
const FILTER_ADDONS = 'FILTER_ADDONS'
const IS_CREATE_ADDONS = 'IS_CREATE_ADDONS'
const IS_UPDATE_ADDONS = 'IS_UPDATE_ADDONS'

const URL = process.env.REACT_APP_URL

export const getAllAddons = (page, pageSize) => {
	return async (dispatch) => {
		dispatch(loadingAddons(true))
		const url =
			page && pageSize
				? `${URL}/admin/services/addons?page=${page}&limit=${pageSize}`
				: `${URL}/admin/services/addons?page=1&limit=30`

		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((addons) => {
					dispatch(getAddons(addons))

					dispatch(isCreateAddons(false))
					dispatch(isUpdateAddons(false))
					dispatch(deleteAddons(false))
					dispatch(loadingAddons(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingAddons(false))
		}
	}
}

export const createAddons = (data) => {
	return async (dispatch) => {
		dispatch(loadingAddons(true))
		const url = `${URL}/admin/services/addons`

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
						dispatch(isCreateAddons(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingAddons(false))
		}
	}
}

export const updateAddon = (data) => {
	return async (dispatch) => {
		dispatch(loadingAddons(true))
		const url = `${URL}/admin/services/addon`
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
					if (res.status === 200 || res.status === 201) {
						dispatch(isUpdateAddons(true))
					}
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingAddons(false))
		}
	}
}

export const dellAddon = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/addon${id}`
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
						dispatch(deleteAddons(true))
					}
				})
		} catch (error) {}
	}
}

const loadingAddons = (boolean) => {
	return {
		type: LOADING_ADDONS,
		payload: boolean,
	}
}

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
