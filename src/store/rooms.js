import _ from 'lodash'
import { dellAxios, getAxios, postAxios, putAxios } from '../utils/axios'

const GET_ROOMS = 'GET_ROOMS'
const GET_ROOMS_WITH_BOOKINGS = 'GET_ROOMS_WITH_BOOKINGS'
const DELL_ROOMS = 'DELL_ROOMS'
const GET_ROOMS_BY_NUMBER = 'GET_ROOMS_BY_NUMBER'

const SET_GALERY_URL = 'SET_GALERY_URL'

const LOADING_ROOMS = 'LOADING_ROOMS'
const LOADING_IMAGE = 'LOADING_IMAGE'
const LOADING_BY_SEARCH = 'LOADING_BY_SEARCH'

const IS_CREATE_ROOMS = 'IS_CREATE_ROOMS'
const IS_UPDATE_ROOMS = 'IS_UPDATE_ROOMS'
const IS_UPLOAD_GALERY = 'IS_UPLOAD_GALERY'

const URL = process.env.REACT_APP_URL

const sort = (data) => {
	data.sort((a, b) =>
		a.roomNumber.localeCompare(b.roomNumber, undefined, {
			numeric: true,
			sensitivity: 'base',
		})
	)
	return data
}

export const getAllRooms = (page, pageSize, filters) => async (dispatch) => {
	let url = ' '
	dispatch(loadingRooms(true))
	if (filters) {
		const keys = Object.keys(filters)
		url = `${URL}/admin/property/rooms?${keys}=${filters[keys]}`
	} else
		url =
			page && pageSize
				? `${URL}/admin/property/rooms?page=${page}&take=${pageSize}`
				: `${URL}/admin/property/rooms?page=1&take=30`

	const response = await getAxios(url, dispatch)
	sort(response.data.items)
	dispatch(getRooms(response.data))
	dispatch(setRoomsByNumber(''))
	dispatch(isCreateRooms(false))
	dispatch(isUpdateRooms(false))
	dispatch(deleteRooms(false))
	dispatch(loadingRooms(false))
}

export const getAllRoomsWithBookings = () => async (dispatch) => {
	const url = `${URL}/admin/property/rooms/with-bookings`
	const response = await getAxios(url, dispatch)
	sort(response.data)
	dispatch(getRoomsWithBooking(response.data))
}

export const getRoomsByNumber = (value) => async (dispatch) => {
	dispatch(setRoomsByNumber(''))
	dispatch(loadingBySearch(true))
	const url = `${URL}/admin/property/rooms/field?value=${value}`
	const response = await getAxios(url, dispatch)
	sort(response.data)
	dispatch(setRoomsByNumber(response.data))
	dispatch(loadingBySearch(false))
}

export const createRoom = (data) => async (dispatch) => {
	dispatch(loadingRooms(true))
	const url = `${URL}/admin/property/rooms`
	await postAxios(url, data, dispatch)
	dispatch(isCreateRooms(true))
	dispatch(loadingRooms(false))
}

export const updateRoom = (data) => async (dispatch) => {
	dispatch(loadingRooms(true))
	const url = `${URL}/admin/property/room`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateRooms(true))
}

export const updateStatusRoom = (data) => async (dispatch) => {
	dispatch(loadingRooms(true))
	const url = `${URL}/admin/property/room`
	await putAxios(url, data, dispatch)
	dispatch(loadingRooms(false))
}

export const dellRoom = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/property/room${id}`
	const response = await dellAxios(url, dispatch, message)
	response && dispatch(deleteRooms(true))
}

export const sendGalery = (galery) => async (dispatch) => {
	const url = `${URL}/admin/property/room/photos`
	let count = 0
	let arrLink = []
	let data = []
	dispatch(loadImage(true))
	galery.map(async (icon) => {
		if (icon.originFileObj) {
			data = new FormData()
			data.append('file', icon.originFileObj)
			const response = await postAxios(url, data, dispatch)
			const link = response.data
			count++
			dispatch(setGaleryUrl(link))
			arrLink.push(link)
		} else {
			const link = icon.name.replace(`${URL}/files/`, '').replaceAll('%2F', '/')
			count++
			dispatch(setGaleryUrl(link))
			arrLink.push(link)
		}
		if (count === galery.length) {
			dispatch(loadImage(false))
			dispatch(isUploadGalery(arrLink))
		}
	})
}

const loadingRooms = (boolean) => ({
	type: LOADING_ROOMS,
	payload: boolean,
})

const loadingBySearch = (boolean) => ({
	type: LOADING_BY_SEARCH,
	payload: boolean,
})

const loadImage = (boolean) => ({
	type: LOADING_IMAGE,
	payload: boolean,
})

const setRoomsByNumber = (bookings) => ({
	type: GET_ROOMS_BY_NUMBER,
	payload: bookings,
})

export const isUploadGalery = (boolean) => ({
	type: IS_UPLOAD_GALERY,
	payload: boolean,
})

const setGaleryUrl = (url) => ({
	type: SET_GALERY_URL,
	payload: url,
})

const getRooms = (rooms) => ({
	type: GET_ROOMS,
	payload: rooms,
})

const getRoomsWithBooking = (rooms) => ({
	type: GET_ROOMS_WITH_BOOKINGS,
	payload: rooms,
})

const deleteRooms = (deleteRooms) => ({
	type: DELL_ROOMS,
	payload: deleteRooms,
})

const isCreateRooms = (isCreateRooms) => ({
	type: IS_CREATE_ROOMS,
	payload: isCreateRooms,
})

const isUpdateRooms = (isUpdateRooms) => ({
	type: IS_UPDATE_ROOMS,
	payload: isUpdateRooms,
})

const InitialState = {
	rooms: '',
	roomsWithBookings: '',
	roomsByNumber: '',
	galeryUrl: '',
	galeryArray: [],
	deleteRooms: false,
	isCreateRooms: false,
	isUpdateRooms: false,
	loading: false,
	loadingImage: false,
	loadingBySearch: false,
}

export const roomsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_ROOMS:
			return { ...state, rooms: action.payload, loading: false }
		case GET_ROOMS_WITH_BOOKINGS:
			return { ...state, roomsWithBookings: action.payload, loading: false }
		case GET_ROOMS_BY_NUMBER:
			return { ...state, roomsByNumber: action.payload, loading: false }
		case SET_GALERY_URL:
			return { ...state, galeryUrl: action.payload, loading: false }
		case DELL_ROOMS:
			return { ...state, deleteRooms: action.payload, loading: false }
		case IS_CREATE_ROOMS:
			return { ...state, isCreateRooms: action.payload, loading: false }
		case IS_UPDATE_ROOMS:
			return { ...state, isUpdateRooms: action.payload, loading: false }
		case IS_UPLOAD_GALERY:
			return { ...state, galeryArray: action.payload, loading: false }
		case LOADING_ROOMS:
			return { ...state, loading: action.payload }
		case LOADING_BY_SEARCH:
			return { ...state, loadingBySearch: action.payload }
		case LOADING_IMAGE:
			return { ...state, loadingImage: action.payload }
		default:
			return state
	}
}
