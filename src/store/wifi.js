import { authorizationToken } from '../utils/token'

const GET_WIFIS = 'GET_WIFIS'
const DELL_WIFIS = 'DELL_WIFIS'

const LOADING_WIFIS = 'LOADING_WIFIS'

const IS_CREATE_WIFIS = 'IS_CREATE_WIFIS'
const IS_UPDATE_WIFIS = 'IS_UPDATE_WIFIS'

const URL = process.env.REACT_APP_URL

export const getAllWiFis = () => {
	return async (dispatch) => {
		dispatch(loadingWiFis(true))
		const url = `${URL}/admin/settings/wifis`

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
				.then((wifi) => {
					dispatch(getWiFis(wifi))

					dispatch(isCreateWiFis(false))
					dispatch(isUpdateWiFis(false))
					dispatch(deleteWiFis(false))
					dispatch(loadingWiFis(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingWiFis(false))
		}
	}
}

export const createWiFi = (data) => {
	return async (dispatch) => {
		dispatch(loadingWiFis(true))
		const url = `${URL}/admin/settings/wifis`

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
						dispatch(isCreateWiFis(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingWiFis(false))
		}
	}
}

export const updateWiFi = (data) => {
	return async (dispatch) => {
		dispatch(loadingWiFis(true))
		const url = `${URL}/admin/settings/wifi`
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
						dispatch(isUpdateWiFis(true))
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
			dispatch(loadingWiFis(false))
		}
	}
}

export const dellWiFi = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/settings/wifi${id}`
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
					} else {
						dispatch(deleteWiFis(true))
					}
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

const loadingWiFis = (boolean) => {
	return {
		type: LOADING_WIFIS,
		payload: boolean,
	}
}

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
