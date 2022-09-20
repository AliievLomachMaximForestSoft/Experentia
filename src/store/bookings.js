import { authorizationToken } from '../utils/token'
const GET_BOOKINGS = 'GET_BOOKINGS'
const GET_BOOKINGS_HISTORY = 'GET_BOOKINGS_HISTORY'
const ERROR_BOOKINGS = 'ERROR_BOOKINGS'

const GET_BOOKINGS_HISTORY_PHONE = 'GET_BOOKINGS_HISTORY_PHONE'
const GET_BOOKINGS_HISTORY_ROOM = 'GET_BOOKINGS_HISTORY_ROOM'
const DELL_BOOKING = 'DELL_BOOKING'

const SET_PDF_URL = 'SET_PDF_URL'

const LOADING_BOOKINGS = 'LOADING_BOOKINGS'
const LOADING_PDF = 'LOADING_PDF'

const IS_CREATE_BOOKING = 'IS_CREATE_BOOKING'
const IS_UPDATE_BOOKING = 'IS_UPDATE_BOOKING'
const IS_PDF_UPLOAD = 'IS_PDF_UPLOAD'

const URL = process.env.REACT_APP_URL

export const getAllBookings = (page, pageSize) => {
	let url = ' '
	return async (dispatch) => {
		dispatch(loadingBookings(true))
		url =
			page && pageSize
				? `${URL}/admin/bookings?page=${page}&take=${pageSize}`
				: `${URL}/admin/bookings?page=1&take=30`

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
				.then((bookings) => {
					dispatch(getBookings(bookings))
					dispatch(errorBookings(''))
					dispatch(isCreateBookings(false))
					dispatch(isUpdateBookings(false))
					dispatch(isPDFFileUpload(false))
					dispatch(deleteBookings(false))
					dispatch(loadingBookings(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const getAllBookingsHistory = (page, pageSize) => {
	let url = ' '
	return async (dispatch) => {
		dispatch(loadingBookings(true))
		url =
			page && pageSize
				? `${URL}/admin/bookings/history?page=${page}&take=${pageSize}`
				: `${URL}/admin/bookings/history?page=1&take=30`

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
				.then((bookings) => {
					dispatch(getBookingsHistory(bookings))
					dispatch(errorBookings(''))
					dispatch(deleteBookings(false))
					dispatch(loadingBookings(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const createBooking = (data) => {
	return async (dispatch) => {
		dispatch(loadingBookings(true))
		const url = `${URL}/admin/bookings`

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
						dispatch(isCreateBookings(true))
					dispatch(loadingBookings(false))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const updateBooking = (data, pdf) => {
	return async (dispatch) => {
		dispatch(loadingBookings(true))
		const url = `${URL}/admin/booking`
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
						if (!pdf) dispatch(isUpdateBookings(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const getBookingsHistoryByPhone = (value) => {
	return async (dispatch) => {
		dispatch(getBookingsHistoryPhone(''))
		dispatch(loadingBookings(true))
		const url = `${URL}/admin/bookings/history/by-phone?phone=${value}`

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
				.then((Search) => {
					dispatch(getBookingsHistoryPhone(Search))
					dispatch(errorBookings(''))
					dispatch(loadingBookings(false))
				})
		} catch (error) {
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const getBookingsHistoryByRoom = (value) => {
	return async (dispatch) => {
		dispatch(getBookingsHistoryRoom(''))
		dispatch(loadingBookings(true))
		const url = `${URL}/admin/bookings/history/by-room?room=${value}`

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
				.then((Search) => {
					dispatch(getBookingsHistoryRoom(Search))
					dispatch(errorBookings(''))
					dispatch(loadingBookings(false))
				})
		} catch (error) {
			dispatch(loadingBookings(false))
			dispatch(errorBookings('error'))
		}
	}
}

export const dellBooking = (id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/booking${id}`
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
				.then(() => {})
				.then(() => {
					dispatch(deleteBookings(true))
					dispatch(errorBookings(''))
				})
		} catch (error) {
			dispatch(errorBookings('error'))
		}
	}
}

export const sendPDFFile = (pdf) => {
	return async (dispatch) => {
		const url = `${URL}/admin/bookings/files`
		dispatch(loadingPDFFile(true))
		const data = new FormData()
		data.append('file', pdf)
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
					dispatch(setPDFFileURL(res))
					dispatch(isPDFFileUpload(true))
					dispatch(isUpdateBookings(false))
					dispatch(loadingPDFFile(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(isPDFFileUpload(false))
			dispatch(loadingPDFFile(false))
		}
	}
}

const loadingBookings = (boolean) => {
	return {
		type: LOADING_BOOKINGS,
		payload: boolean,
	}
}

const loadingPDFFile = (boolean) => {
	return {
		type: LOADING_PDF,
		payload: boolean,
	}
}

const getBookings = (bookings) => ({
	type: GET_BOOKINGS,
	payload: bookings,
})

const getBookingsHistory = (bookings) => ({
	type: GET_BOOKINGS_HISTORY,
	payload: bookings,
})

const setPDFFileURL = (bookings) => ({
	type: SET_PDF_URL,
	payload: bookings,
})

export const getBookingsHistoryPhone = (bookings) => ({
	type: GET_BOOKINGS_HISTORY_PHONE,
	payload: bookings,
})

export const getBookingsHistoryRoom = (bookings) => ({
	type: GET_BOOKINGS_HISTORY_ROOM,
	payload: bookings,
})

const deleteBookings = (deleteBookings) => ({
	type: DELL_BOOKING,
	payload: deleteBookings,
})

const isCreateBookings = (isCreateBookings) => ({
	type: IS_CREATE_BOOKING,
	payload: isCreateBookings,
})

const isPDFFileUpload = (isPDFFileUpload) => ({
	type: IS_PDF_UPLOAD,
	payload: isPDFFileUpload,
})

const isUpdateBookings = (isUpdateBookings) => ({
	type: IS_UPDATE_BOOKING,
	payload: isUpdateBookings,
})

const errorBookings = (textError) => ({
	type: ERROR_BOOKINGS,
	payload: textError,
})

const InitialState = {
	bookings: '',
	bookingsHistory: '',
	bookingsHistoryPhone: '',
	bookingsHistoryRoom: '',
	deleteBookings: false,
	isCreateBookings: false,
	isUpdateBookings: false,
	isUploadPdf: false,
	error: '',
	loading: false,
	loadingPdf: false,
	pdfUrl: '',
}

export const bookingsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_BOOKINGS:
			return { ...state, bookings: action.payload, loading: false }
		case GET_BOOKINGS_HISTORY:
			return { ...state, bookingsHistory: action.payload, loading: false }
		case GET_BOOKINGS_HISTORY_PHONE:
			return { ...state, bookingsHistoryPhone: action.payload, loading: false }
		case GET_BOOKINGS_HISTORY_ROOM:
			return { ...state, bookingsHistoryRoom: action.payload, loading: false }
		case DELL_BOOKING:
			return { ...state, deleteBookings: action.payload, loading: false }
		case IS_CREATE_BOOKING:
			return { ...state, isCreateBookings: action.payload, loading: false }
		case IS_UPDATE_BOOKING:
			return { ...state, isUpdateBookings: action.payload, loading: false }
		case IS_PDF_UPLOAD:
			return { ...state, isUploadPdf: action.payload, loading: false }
		case ERROR_BOOKINGS:
			return { ...state, error: action.payload }
		case LOADING_BOOKINGS:
			return { ...state, loading: action.payload }
		case LOADING_PDF:
			return { ...state, loadingPdf: action.payload }
		case SET_PDF_URL:
			return { ...state, pdfUrl: action.payload }
		default:
			return state
	}
}
