import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'

const GET_ROOMS_TYPES = 'GET_ROOMS_TYPES'
const DELL_ROOMS_TYPES = 'DELL_ROOMS_TYPES'

const LOADING_ROOMS_TYPES = 'LOADING_ROOMS_TYPES'

const IS_CREATE_ROOMS_TYPES = 'IS_CREATE_ROOMS_TYPES'
const IS_UPDATE_ROOMS_TYPES = 'IS_UPDATE_ROOMS_TYPES'
const IS_UPDATE_INDEX_ROOM_TYPES = 'IS_UPDATE_INDEX_ROOM_TYPES'

const URL = process.env.REACT_APP_URL

export const getAllRoomTypes = () => async (dispatch) => {
	dispatch(loadingRoomTypes(true))
	const url = `${URL}/admin/room/types`
	const response = await getAxios(url, dispatch)
	dispatch(getRoomTypes(response.data))
	dispatch(isCreateRoomTypes(false))
	dispatch(isUpdateRoomTypes(false))
	dispatch(isUpdateIndexRoomTypes(false))
	dispatch(loadingRoomTypes(false))
}

export const createRoomType = (data) => async (dispatch) => {
	dispatch(loadingRoomTypes(true))
	const url = `${URL}/admin/room/types`
	await postAxios(url, data, dispatch)
	dispatch(isCreateRoomTypes(true))
}

export const updateRoomType = (data) => async (dispatch) => {
	dispatch(loadingRoomTypes(true))
	const url = `${URL}/admin/room/type`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateRoomTypes(true))
}

export const updateIndexRoomTypes = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/room/types/order`
	const response = await patchAxios(url, data, dispatch)
	if (!value) dispatch(isUpdateIndexRoomTypes(true))
	dispatch(getAllRoomTypes(response.data))
	dispatch(deleteRoomTypes(false))
}

export const dellRoomType = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/room/type${id}`
	await dellAxios(url, dispatch, message)
	dispatch(deleteRoomTypes(true))
}

const loadingRoomTypes = (boolean) => ({
	type: LOADING_ROOMS_TYPES,
	payload: boolean,
})

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
