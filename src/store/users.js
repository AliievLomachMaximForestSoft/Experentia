import { authorizationToken } from '../utils/token'
const GET_USERS = 'GET_USERS'
const ERROR_USERS = 'ERROR_USERS'
const LOADING_USERS = 'LOADING_USERS'
const LOADING_DETAILS_USERS = 'LOADING_DETAILS_USERS'
const LOADING_BY_SEARCH = 'LOADING_BY_SEARCH'
const GET_USER = 'GET_USER'
const GET_USER_BY_PHONE = 'GET_USER_BY_PHONE'
const DELL_USER = 'DELL_USER'
const URL = process.env.REACT_APP_URL

export const getAllUsers = (page, pageSize) => {
	return async (dispatch) => {
		dispatch(getSearchUsers(''))
		dispatch(loadingUsers(true))

		const url =
			page && pageSize
				? `${URL}/superadmin/users?page=${page}&take=${pageSize}`
				: `${URL}/superadmin/users?page=1&take=30`

		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((users) => {
					dispatch(getUsers(users))
					dispatch(errorUsers(''))

					dispatch(deleteUser(false))
					dispatch(loadingUsers(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingUsers(false))
			dispatch(errorUsers('error'))
		}
	}
}

export const getUserDetails = (id) => {
	return async (dispatch) => {
		dispatch(loadingUserDetails(true))
		const url = `${URL}/superadmin/user${id}`

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
				.then((property) => {
					dispatch(getUser(property))
					dispatch(errorUsers(''))
					dispatch(loadingUserDetails(false))
				})
		} catch (error) {
			dispatch(loadingUserDetails(false))
			dispatch(errorUsers('error'))
		}
	}
}

export const getUsersByPhone = (phone) => {
	return async (dispatch) => {
		dispatch(loadingBySearch(true))
		const url = `${URL}/superadmin/users-by-phone?phone=${phone}`
		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			})
				.then((res) => {
					return res.json()
				})
				.then((users) => {
					dispatch(getSearchUsers(users))
					dispatch(errorUsers(''))
					dispatch(loadingBySearch(false))
				})
		} catch (error) {
			dispatch(loadingBySearch(false))
			dispatch(errorUsers('error'))
		}
	}
}

export const dellUser = (id) => {
	return async (dispatch) => {
		const url = `${URL}/superadmin/user${id}` //?
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
					dispatch(deleteUser(true))
					dispatch(errorUsers(''))
				})
		} catch (error) {
			dispatch(errorUsers('error'))
		}
	}
}

const loadingUsers = (boolean) => {
	return {
		type: LOADING_USERS,
		payload: boolean,
	}
}

const loadingUserDetails = (boolean) => {
	return {
		type: LOADING_DETAILS_USERS,
		payload: boolean,
	}
}

const loadingBySearch = (boolean) => ({
	type: LOADING_BY_SEARCH,
	payload: boolean,
})

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
})

const getUser = (user) => ({
	type: GET_USER,
	payload: user,
})

const getSearchUsers = (users) => ({
	type: GET_USER_BY_PHONE,
	payload: users,
})

const deleteUser = (deleteUser) => ({
	type: DELL_USER,
	payload: deleteUser,
})

const errorUsers = (textError) => ({
	type: ERROR_USERS,
	payload: textError,
})

const InitialState = {
	users: '',
	usersSearch: '',
	userDatails: '',
	deleteUser: false,
	error: '',
	loading: false,
	loadingDetails: false,
	loadingBySearch: false,
}

export const usersReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, loading: false }
		case GET_USER_BY_PHONE:
			return { ...state, usersSearch: action.payload, loading: false }
		case GET_USER:
			return { ...state, userDatails: action.payload, loading: false }
		case DELL_USER:
			return { ...state, deleteUser: action.payload, loading: false }
		case ERROR_USERS:
			return { ...state, error: action.payload }
		case LOADING_USERS:
			return { ...state, loading: action.payload }
		case LOADING_DETAILS_USERS:
			return { ...state, loadingDetails: action.payload }
		case LOADING_BY_SEARCH:
			return { ...state, loadingBySearch: action.payload }
		default:
			return state
	}
}
