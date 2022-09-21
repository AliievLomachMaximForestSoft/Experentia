import { getAxios, postAxios, putAxios } from '../utils/axios'

const USER_LOGIN = 'USER_LOGIN'
const ERROR_LOGIN = 'ERROR_LOGIN'
const LOADING_LOGIN = 'LOADING_LOGIN'
const AUTH_USER = 'AUTH_USER'
const SENDING_SUCCESS = 'SENDING_SUCCESS'
const SET_STATUS = 'SET_STATUS'
const CREATE_NEW_PASSWORD_SUCCESS = 'CREATE_NEW_PASSWORD_SUCCESS'
const URL = process.env.REACT_APP_URL

export const loginUser = (data) => async (dispatch) => {
	dispatch(loadingLogin(true))
	const url = `${URL}/auth/login/admin`
	const response = await postAxios(
		url,
		{ password: data.password, email: data.email },
		dispatch
	)
	const authorizationToken = response.data.token
	localStorage.setItem('token', authorizationToken)

	if (data.remember) {
		localStorage.setItem('remember', true)
	}
	dispatch(userLogin(authorizationToken))
	dispatch(isAuthUser(true))
	dispatch(errorLogin(''))
	dispatch(loadingLogin(false))
}

export const sendEmail = (data) => async (dispatch) => {
	dispatch(loadingLogin(true))
	const url = `${URL}/auth/superadmin/forgot/password?email=${data.email}`
	await getAxios(url, dispatch)
	dispatch(loadingLogin(false))
	dispatch(sendingSuccess(true))
	dispatch(errorLogin(''))
}

export const createNewPassword = (data, token) => async (dispatch) => {
	dispatch(loadingLogin(true))
	const currentData = {
		token: token,
		password: data.password,
	}
	const url = `${URL}/auth/superadmin/reset/password`
	await putAxios(url, currentData, dispatch)
	dispatch(createNewPasswordSuccess(true))
	dispatch(loadingLogin(false))
}

export const loadingLogin = (boolean) => ({
	type: LOADING_LOGIN,
	payload: boolean,
})

export const isAuthUser = (boolean) => ({ type: AUTH_USER, payload: boolean })

const userLogin = (authorizationToken) => ({
	type: USER_LOGIN,
	payload: authorizationToken,
})

export const sendingSuccess = (boolean) => ({
	type: SENDING_SUCCESS,
	payload: boolean,
})

export const createNewPasswordSuccess = (boolean) => ({
	type: CREATE_NEW_PASSWORD_SUCCESS,
	payload: boolean,
})

export const errorLogin = (textError) => ({
	type: ERROR_LOGIN,
	payload: textError,
})

export const setStatus = (status) => ({
	type: SET_STATUS,
	payload: status,
})

const InitialState = {
	authorizationToken: '',
	status: 200,
	error: '',
	loading: false,
	isAuth: null,
	sending: false,
	resetPasswordSuccess: false,
}

export const loginReducer = (state = InitialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return { ...state, authorizationToken: action.payload, loading: false }
		case ERROR_LOGIN:
			return { ...state, error: action.payload }
		case LOADING_LOGIN:
			return { ...state, loading: action.payload }
		case AUTH_USER:
			return { ...state, isAuth: action.payload }
		case SENDING_SUCCESS:
			return { ...state, sending: action.payload }
		case SET_STATUS:
			return { ...state, status: action.payload }
		case CREATE_NEW_PASSWORD_SUCCESS:
			return { ...state, resetPasswordSuccess: action.payload }
		default:
			return state
	}
}
