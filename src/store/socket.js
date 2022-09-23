import { io } from 'socket.io-client'
import { setStatus } from './login'

const SET_SOCKET = 'SET_SOCKET'
const SET_COUNT_UNREAD_MESS = 'SET_COUNT_UNREAD_MESS'

const CREATE_MESS = 'CREATE_MESS'

const GET_REQUESTS = 'GET_REQUESTS'
const GET_ALL_MESS = 'GET_ALL_MESS'
const DELL_REQUESTS = 'DELL_REQUESTS'
const CHAT_ARR_BY_USER_ID = 'CHAT_ARR_BY_USER_ID'

const LOADING_REQUESTS = 'LOADING_REQUESTS'

const IS_UPDATE_REQUESTS = 'IS_UPDATE_REQUESTS'
const IS_UPDATE_MESS = 'IS_UPDATE_MESS'

const URL = process.env.REACT_APP_URL

//global connect
export const socket_ = io(URL, {
	auth: {
		token: `${localStorage.getItem('token')}`,
	},
	transports: ['websocket'],
})
//

export const getAllRequests =
	(page = 1, pageSize = 30) =>
	async (dispatch) => {
		dispatch(loadingRequests(true))
		socket_.emit('getServiceOrders', { page, take: pageSize }, (event) => {
			dispatch(getRequests(event))
			dispatch(isUpdateRequests(false))
			dispatch(deleteRequests(false))
		})
		dispatch(loadingRequests(false))
	}

export const updateRequest = (data) => async (dispatch) => {
	dispatch(loadingRequests(true))
	socket_.emit('updateServiceOrder', data, () => {
		dispatch(isUpdateRequests(true))
	})
	dispatch(loadingRequests(false))
}

export const dellRequest = (id) => async (dispatch) => {
	socket_.emit('deleteServiceOrder', { id }, () => {
		dispatch(deleteRequests(true))
	})
}

export const getAllMess =
	(page = 1, pageSize = 1000) =>
	async (dispatch) => {
		dispatch(loadingRequests(true))
		socket_.emit('getMessages', { page, limit: pageSize }, (event) => {
			dispatch(getMess(event))
		})
		dispatch(loadingRequests(false))
	}

export const updateMess = (data) => async (dispatch) => {
	dispatch(loadingRequests(true))
	socket_.emit('updateMessage', data)
	dispatch(loadingRequests(false))
}

export const setSocket = (socket) => ({
	type: SET_SOCKET,
	payload: socket,
})

const loadingRequests = (boolean) => ({
	type: LOADING_REQUESTS,
	payload: boolean,
})

export const getRequests = (requests) => ({
	type: GET_REQUESTS,
	payload: requests,
})

export const getMess = (requests) => ({
	type: GET_ALL_MESS,
	payload: requests,
})

export const createMess = (mess) => ({
	type: CREATE_MESS,
	payload: mess,
})

export const setChatArrByUserId = (obj) => ({
	type: CHAT_ARR_BY_USER_ID,
	payload: obj,
})

const deleteRequests = (deleteRequests) => ({
	type: DELL_REQUESTS,
	payload: deleteRequests,
})

const isUpdateRequests = (isUpdateRequests) => ({
	type: IS_UPDATE_REQUESTS,
	payload: isUpdateRequests,
})

export const isUpdateMess_ = (isUpdateMess) => ({
	type: IS_UPDATE_MESS,
	payload: isUpdateMess,
})

export const setCountUnreadMess = (mess) => ({
	type: SET_COUNT_UNREAD_MESS,
	payload: mess,
})

const InitialState = {
	socket: '',
	//
	requests: '',
	deleteRequests: false,
	isUpdateRequests: false,
	loading: false,
	//
	allMess: '',
	chatArrByUserId: null,
	isUpdateMess: false,
	countUnreadMess: '',
}

export const socketReducer = (state = InitialState, action) => {
	switch (action.type) {
		case SET_SOCKET:
			return { ...state, socket: action.payload, loading: false }
		case SET_COUNT_UNREAD_MESS:
			return { ...state, countUnreadMess: action.payload, loading: false }
		case CREATE_MESS:
			return { ...state, allMess: action.payload, loading: false }
		case GET_REQUESTS:
			return { ...state, requests: action.payload, loading: false }
		case GET_ALL_MESS:
			return { ...state, allMess: action.payload, loading: false }
		case DELL_REQUESTS:
			return { ...state, deleteRequests: action.payload, loading: false }
		case IS_UPDATE_REQUESTS:
			return { ...state, isUpdateRequests: action.payload, loading: false }
		case IS_UPDATE_MESS:
			return { ...state, isUpdateMess: action.payload, loading: false }
		case CHAT_ARR_BY_USER_ID:
			return { ...state, chatArrByUserId: action.payload, loading: false }
		case LOADING_REQUESTS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
