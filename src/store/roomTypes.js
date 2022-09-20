import { authorizationToken } from '../utils/token'

const GET_ROOMS_TYPES = 'GET_ROOMS_TYPES'
const DELL_ROOMS_TYPES = 'DELL_ROOMS_TYPES'

const LOADING_ROOMS_TYPES = 'LOADING_ROOMS_TYPES'

const IS_CREATE_ROOMS_TYPES = 'IS_CREATE_ROOMS_TYPES'
const IS_UPDATE_ROOMS_TYPES = 'IS_UPDATE_ROOMS_TYPES'
const IS_UPDATE_INDEX_ROOM_TYPES = 'IS_UPDATE_INDEX_ROOM_TYPES'

const URL = process.env.REACT_APP_URL

export const getAllRoomTypes = () => {
	return async (dispatch) => {
		dispatch(loadingRoomTypes(true))
		const url = `${URL}/admin/room/types`

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
				.then((roomTypes) => {
					dispatch(getRoomTypes(roomTypes))

					dispatch(isCreateRoomTypes(false))
					dispatch(isUpdateRoomTypes(false))
					dispatch(loadingRoomTypes(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRoomTypes(false))
		}
	}
}

export const createRoomType = (data) => {
	return async (dispatch) => {
		dispatch(loadingRoomTypes(true))
		const url = `${URL}/admin/room/types`

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
						dispatch(isCreateRoomTypes(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRoomTypes(false))
		}
	}
}

export const updateRoomType = (data) => {
	return async (dispatch) => {
		dispatch(loadingRoomTypes(true))
		const url = `${URL}/admin/room/type`
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
						dispatch(isUpdateRoomTypes(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRoomTypes(false))
		}
	}
}

export const updateIndexRoomTypes = (data, value) => {
	return async (dispatch) => {
		const url = `${URL}/admin/room/types/order`
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
					if (!value) dispatch(isUpdateIndexRoomTypes(true))
					return res.json()
				})
				.then((roomTypes) => {
					dispatch(getAllRoomTypes(roomTypes))
					dispatch(isUpdateIndexRoomTypes(false))
					dispatch(deleteRoomTypes(false))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

export const dellRoomType = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/room/type${id}`
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
						dispatch(deleteRoomTypes(true))
					}
				})
		} catch (error) {}
	}
}

const loadingRoomTypes = (boolean) => {
	return {
		type: LOADING_ROOMS_TYPES,
		payload: boolean,
	}
}

const isUpdateIndexRoomTypes = (properties) => ({
	type: IS_UPDATE_INDEX_ROOM_TYPES,
	payload: properties,
})

const getRoomTypes = (roomTypes) => ({
	type: GET_ROOMS_TYPES,
	payload: roomTypes,
})

const deleteRoomTypes = (deleteRoomTypes) => ({
	type: DELL_ROOMS_TYPES,
	payload: deleteRoomTypes,
})

const isCreateRoomTypes = (isCreateRoomTypes) => ({
	type: IS_CREATE_ROOMS_TYPES,
	payload: isCreateRoomTypes,
})

const isUpdateRoomTypes = (isUpdateRoomTypes) => ({
	type: IS_UPDATE_ROOMS_TYPES,
	payload: isUpdateRoomTypes,
})

const InitialState = {
	roomTypes: '',
	deleteRoomTypes: false,
	isCreateRoomTypes: false,
	isUpdateRoomTypes: false,
	isUpdateIndexRoomTypes: false,
	loading: false,
}

export const roomTypesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_ROOMS_TYPES:
			return { ...state, roomTypes: action.payload, loading: false }
		case DELL_ROOMS_TYPES:
			return { ...state, deleteRoomTypes: action.payload, loading: false }
		case IS_CREATE_ROOMS_TYPES:
			return { ...state, isCreateRoomTypes: action.payload, loading: false }
		case IS_UPDATE_ROOMS_TYPES:
			return { ...state, isUpdateRoomTypes: action.payload, loading: false }
		case IS_UPDATE_INDEX_ROOM_TYPES:
			return {
				...state,
				isUpdateIndexRoomTypes: action.payload,
				loading: false,
			}
		case LOADING_ROOMS_TYPES:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
