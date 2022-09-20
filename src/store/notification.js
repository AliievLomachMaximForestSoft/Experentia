import { authorizationToken } from '../utils/token'
const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
const GET_NOTIFICATION = 'GET_NOTIFICATION'
const SET_ICON_URL = 'SET_ICON_URL'
const DELL_NOTIFICATION = 'DELL_NOTIFICATION'
const IS_CREATE_NOTIFICATION = 'IS_CREATE_NOTIFICATION'
const IS_ICON_UPLOAD = 'IS_ICON_UPLOAD'
const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS'
const LOADING_ICON = 'LOADING_ICON'
const LOADING_DETAILS_NOTIFICATION = 'LOADING_DETAILS_NOTIFICATION'
const GET_DATE_PICKER = 'GET_DATE_PICKER'

const URL = process.env.REACT_APP_URL

export const getAllNotifications = (page, pageSize, startDate, endDate) => {
	return async (dispatch) => {
		dispatch(loadingNotifications(true))

		const url =
			page && pageSize && startDate && endDate
				? `${URL}/admin/property/notifications?page=${page}&limit=${pageSize}&start=${startDate}&end=${endDate}`
				: page && pageSize
				? `${URL}/admin/property/notifications?page=${page}&limit=${pageSize}`
				: `${URL}/admin/property/notifications?page=1&limit=30`

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
				.then((notifications) => {
					dispatch(getNotifications(notifications))
					dispatch(isCreateNotification(false))
					dispatch(loadingNotifications(false))
					dispatch(deleteNotification(false))
					dispatch(setIconURL('undefined'))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingNotifications(false))
		}
	}
}

export const sendIcon = (icon) => {
	return async (dispatch) => {
		const url = `${URL}/admin/property/notification/images`
		dispatch(loadIcon(true))
		const data = new FormData()
		data.append('file', icon)
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
					dispatch(setIconURL(res))
					dispatch(isIconUpload(true))
					dispatch(loadIcon(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(isIconUpload(false))
			dispatch(loadIcon(false))
		}
	}
}

export const createNotification = (data) => {
	return async (dispatch) => {
		dispatch(loadingNotifications(true))
		const url = `${URL}/admin/property/notifications`

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
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						dispatch(loadingNotifications(false))
					} else {
						dispatch(isCreateNotification(true))
						dispatch(loadingNotifications(false))
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingNotifications(false))
		}
	}
}

export const dellNotification = (id) => {
	return async (dispatch) => {
		dispatch(loadingNotifications(true))
		const url = `${URL}/admin/property/notification${id}` //?
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
					dispatch(deleteNotification(true))
					dispatch(loadingNotifications(false))
				})
		} catch (error) {
			dispatch(loadingNotifications(false))
		}
	}
}

const loadingNotifications = (boolean) => {
	return {
		type: LOADING_NOTIFICATIONS,
		payload: boolean,
	}
}

export const loadIcon = (boolean) => {
	return {
		type: LOADING_ICON,
		payload: boolean,
	}
}

const setIconURL = (url) => ({
	type: SET_ICON_URL,
	payload: url,
})

const getNotifications = (service) => ({
	type: GET_NOTIFICATIONS,
	payload: service,
})

const deleteNotification = (deleteService) => ({
	type: DELL_NOTIFICATION,
	payload: deleteService,
})

const isCreateNotification = (isCreateService) => ({
	type: IS_CREATE_NOTIFICATION,
	payload: isCreateService,
})

const isIconUpload = (boolean) => ({
	type: IS_ICON_UPLOAD,
	payload: boolean,
})

export const getDatePicker = (date) => ({
	type: GET_DATE_PICKER,
	payload: date,
})

const InitialState = {
	notifications: '',
	notificationDetails: '',
	iconUrl: '',
	deleteNotification: false,
	isCreateNotification: false,
	loading: false,
	loadingIcon: false,
	isIconUpload: false,
	datePicker: null,
}

export const notificationReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_NOTIFICATIONS:
			return { ...state, notifications: action.payload, loading: false }
		case GET_NOTIFICATION:
			return { ...state, notificationDetails: action.payload, loading: false }
		case SET_ICON_URL:
			return { ...state, iconUrl: action.payload, loading: false }
		case DELL_NOTIFICATION:
			return { ...state, deleteNotification: action.payload, loading: false }
		case IS_CREATE_NOTIFICATION:
			return { ...state, isCreateNotification: action.payload, loading: false }
		case IS_ICON_UPLOAD:
			return { ...state, isIconUpload: action.payload, loading: false }
		case LOADING_NOTIFICATIONS:
			return { ...state, loading: action.payload }
		case LOADING_ICON:
			return { ...state, loadingIcon: action.payload }
		case LOADING_DETAILS_NOTIFICATION:
			return { ...state, loadingDetails: action.payload }
		case GET_DATE_PICKER:
			return { ...state, datePicker: action.payload }
		default:
			return state
	}
}
