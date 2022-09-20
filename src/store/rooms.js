import { authorizationToken } from '../utils/token'
import _ from 'lodash'
const axios = require('axios')

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

export const getAllRooms = (page, pageSize, filters) => {
	let url = ' '
	return async (dispatch) => {
		dispatch(loadingRooms(true))
		if (filters) {
			const keys = Object.keys(filters)
			url = `${URL}/admin/property/rooms?${keys}=${filters[keys]}`
		} else
			url =
				page && pageSize
					? `${URL}/admin/property/rooms?page=${page}&take=${pageSize}`
					: `${URL}/admin/property/rooms?page=1&take=30`

		// const response = await axios.get(url, {
		// 	headers: {
		// 		Authorization: `Bearer ${localStorage.getItem('token')}`,
		// 	},
		// })
		// console.log(response.data)
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
				.then((rooms) => {
					rooms.items.sort((a, b) =>
						a.roomNumber.localeCompare(b.roomNumber, undefined, {
							numeric: true,
							sensitivity: 'base',
						})
					)
					dispatch(getRooms(rooms))
					dispatch(setRoomsByNumber(''))
					dispatch(isCreateRooms(false))
					dispatch(isUpdateRooms(false))
					dispatch(deleteRooms(false))
					dispatch(loadingRooms(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRooms(false))
		}
	}
}

export const getAllRoomsWithBookings = () => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/rooms/with-bookings`
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
				.then((rooms) => {
					rooms.sort((a, b) =>
						a.roomNumber.localeCompare(b.roomNumber, undefined, {
							numeric: true,
							sensitivity: 'base',
						})
					)
					dispatch(getRoomsWithBooking(rooms))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

export const getRoomsByNumber = (value) => {
	return async (dispatch) => {
		dispatch(setRoomsByNumber(''))
		dispatch(loadingBySearch(true))
		const url = `${URL}/admin/property/rooms/field?value=${value}`

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
				.then((propertySearch) => {
					dispatch(setRoomsByNumber(propertySearch))
					dispatch(loadingBySearch(false))
				})
		} catch (error) {
			dispatch(loadingBySearch(false))
		}
	}
}

export const createRoom = (data) => {
	return async (dispatch) => {
		dispatch(loadingRooms(true))
		const url = `${URL}/admin/property/rooms`
		try {
			const response = fetch(url, {
				method: 'POST',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.status === 200 || res.status === 201)
						dispatch(isCreateRooms(true))
					dispatch(loadingRooms(false))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRooms(false))
		}
	}
}

export const updateRoom = (data) => {
	console.log('data', data)
	return async (dispatch) => {
		dispatch(loadingRooms(true))
		const url = `${URL}/admin/property/room`
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
						dispatch(isUpdateRooms(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRooms(false))
		}
	}
}

export const updateStatusRoom = (data) => {
	return async (dispatch) => {
		dispatch(loadingRooms(true))
		const url = `${URL}/admin/property/room`
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
					dispatch(loadingRooms(false))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdateStatus', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingRooms(false))
		}
	}
}

export const dellRoom = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/room${id}`
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
				.then((resp) => {
					return resp.json()
				})
				.then((resp) => {
					if (resp.statusCode === 500) {
						message()
					} else {
						dispatch(deleteRooms(true))
					}
				})
		} catch (error) {}
	}
}

export const sendGalery = (galery) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/room/photos`
		let count = 0
		let arrLink = []
		let data = []
		dispatch(loadImage(true))
		try {
			galery.map(async (icon) => {
				if (icon.originFileObj) {
					data = new FormData()
					data.append('file', icon.originFileObj)

					const res = await fetch(url, {
						method: 'POST',
						mode: 'cors',
						headers: {
							accept: 'application/json',
							Authorization: `Bearer ${authorizationToken}`,
						},
						credentials: 'include',
						body: data,
					})
					const link = await res.text()
					count++
					dispatch(setGaleryUrl(link))
					arrLink.push(link)
				} else {
					const link = icon.name
						.replace(`${URL}/files/`, '')
						.replaceAll('%2F', '/')
					count++
					dispatch(setGaleryUrl(link))
					arrLink.push(link)
				}
				if (count === galery.length) {
					dispatch(loadImage(false))
					dispatch(isUploadGalery(arrLink))
				}
			})
		} catch (error) {
			console.log('error', error)
			dispatch(loadImage(false))
			dispatch(isUploadGalery([]))
		}
	}
}

const loadingRooms = (boolean) => {
	return {
		type: LOADING_ROOMS,
		payload: boolean,
	}
}

const loadingBySearch = (boolean) => {
	return {
		type: LOADING_BY_SEARCH,
		payload: boolean,
	}
}

const loadImage = (boolean) => {
	return {
		type: LOADING_IMAGE,
		payload: boolean,
	}
}

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
