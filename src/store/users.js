import { getAxios } from '../utils/axios'
const GET_USERS = 'GET_USERS'
const LOADING_USERS = 'LOADING_USERS'
const LOADING_DETAILS_USERS = 'LOADING_DETAILS_USERS'
const LOADING_BY_SEARCH = 'LOADING_BY_SEARCH'
const GET_USER = 'GET_USER'
const GET_USER_BY_PHONE = 'GET_USER_BY_PHONE'
const DELL_USER = 'DELL_USER'
const URL = process.env.REACT_APP_URL

export const getAllUsers = (page, pageSize) => async (dispatch) => {
	dispatch(getSearchUsers(''))
	dispatch(loadingUsers(true))
	const url =
		page && pageSize
			? `${URL}/admin/users?page=${page}&take=${pageSize}`
			: `${URL}/admin/users?page=1&take=30`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getUsers(response.data))
		dispatch(deleteUser(false))
	}
	dispatch(loadingUsers(false))
}

export const getUserDetails = (id) => async (dispatch) => {
	dispatch(loadingUserDetails(true))
	const url = `${URL}/admin/user${id}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getUser(response.data))
	dispatch(loadingUserDetails(false))
}

export const getUsersByPhone = (phone) => async (dispatch) => {
	dispatch(loadingBySearch(true))
	const url = `${URL}/superadmin/users-by-phone?phone=${phone}`
	const response = await getAxios(url, dispatch)
	response && dispatch(getSearchUsers(response.data))
	dispatch(loadingBySearch(false))
}

const loadingUsers = (boolean) => ({
	type: LOADING_USERS,
	payload: boolean,
})

const loadingUserDetails = (boolean) => ({
	type: LOADING_DETAILS_USERS,
	payload: boolean,
})

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

const InitialState = {
	users: '',
	usersSearch: '',
	userDatails: '',
	deleteUser: false,
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
