import { dellAxios, getAxios, postAxios, putAxios } from '../utils/axios'

const GET_BOOKINGS = 'GET_BOOKINGS'
const GET_BOOKINGS_HISTORY = 'GET_BOOKINGS_HISTORY'

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

export const getAllBookings = (page, pageSize) => async (dispatch) => {
	dispatch(loadingBookings(true))
	const url =
		page && pageSize
			? `${URL}/admin/bookings?page=${page}&take=${pageSize}`
			: `${URL}/admin/bookings?page=1&take=30`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getBookings(response.data))
		dispatch(isCreateBookings(false))
		dispatch(isUpdateBookings(false))
		dispatch(isPDFFileUpload(false))
		dispatch(deleteBookings(false))
	}
	dispatch(loadingBookings(false))
}

export const getAllBookingsHistory = (page, pageSize) => async (dispatch) => {
	dispatch(loadingBookings(true))
	const url =
		page && pageSize
			? `${URL}/admin/bookings/history?page=${page}&take=${pageSize}`
			: `${URL}/admin/bookings/history?page=1&take=30`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getBookingsHistory(response.data))
		dispatch(deleteBookings(false))
	}
	dispatch(loadingBookings(false))
}

export const createBooking = (data) => async (dispatch) => {
	dispatch(loadingBookings(true))
	const url = `${URL}/admin/bookings`
	const response = await postAxios(url, data, dispatch)
	response && dispatch(isCreateBookings(true))
	dispatch(loadingBookings(false))
}

export const updateBooking = (data) => async (dispatch) => {
	dispatch(loadingBookings(true))
	const url = `${URL}/admin/booking`
	const response = await putAxios(url, data, dispatch)
	if (response) dispatch(isUpdateBookings(true))
	dispatch(loadingBookings(false))
}

export const getBookingsHistoryByPhone = (value) => async (dispatch) => {
	dispatch(getBookingsHistoryPhone(''))
	dispatch(loadingBookings(true))
	const url = `${URL}/admin/bookings/history/by-phone?phone=${value}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getBookingsHistoryPhone(response.data))
	dispatch(loadingBookings(false))
}

export const getBookingsHistoryByRoom = (value) => async (dispatch) => {
	dispatch(getBookingsHistoryRoom(''))
	dispatch(loadingBookings(true))
	const url = `${URL}/admin/bookings/history/by-room?room=${value}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getBookingsHistoryRoom(response.data))
	dispatch(loadingBookings(false))
}

export const dellBooking = (id) => async (dispatch) => {
	const url = `${URL}/admin/booking${id}`
	const response = await dellAxios(url, dispatch)
	response && dispatch(deleteBookings(true))
}

export const sendPDFFile = (pdf) => async (dispatch) => {
	const url = `${URL}/admin/bookings/files`
	dispatch(loadingPDFFile(true))
	const data = new FormData()
	data.append('file', pdf)
	const response = await postAxios(url, data, dispatch)
	if (response) {
		dispatch(setPDFFileURL(response.data))
		dispatch(isPDFFileUpload(true))
	}
	dispatch(isUpdateBookings(false))
	dispatch(loadingPDFFile(false))
}

const loadingBookings = (boolean) => ({
	type: LOADING_BOOKINGS,
	payload: boolean,
})

const loadingPDFFile = (boolean) => ({
	type: LOADING_PDF,
	payload: boolean,
})

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

const InitialState = {
	bookings: '',
	bookingsHistory: '',
	bookingsHistoryPhone: '',
	bookingsHistoryRoom: '',
	deleteBookings: false,
	isCreateBookings: false,
	isUpdateBookings: false,
	isUploadPdf: false,
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
