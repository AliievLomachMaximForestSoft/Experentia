const USER_LOGIN = 'USER_LOGIN'
const ERROR_LOGIN = 'ERROR_LOGIN'
const LOADING_LOGIN = 'LOADING_LOGIN'
const AUTH_USER = 'AUTH_USER'
const SENDING_SUCCESS = 'SENDING_SUCCESS'
const CREATE_NEW_PASSWORD_SUCCESS = 'CREATE_NEW_PASSWORD_SUCCESS'
const URL = process.env.REACT_APP_URL

export const loginUser = (data) => {
	return async (dispatch) => {
		dispatch(loadingLogin(true))

		const url = `${URL}/auth/login/admin`

		try {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({ password: data.password, email: data.email }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					const authorizationToken = response.token
					localStorage.setItem('token', authorizationToken)

					if (data.remember) {
						localStorage.setItem('remember', true)
					}
					dispatch(userLogin(authorizationToken))
					dispatch(isAuthUser(true))
					dispatch(errorLogin(''))
					dispatch(loadingLogin(false))

					if (response.statusCode === 401) {
						if (response.message === 'Unauthorized') {
							dispatch(errorLogin('401'))
							dispatch(loadingLogin(false))
						}
						if (response.message === 'Wrong credentials provided') {
							dispatch(errorLogin('400'))
							dispatch(loadingLogin(false))
						}
					}
				})
		} catch (error) {
			dispatch(errorLogin('error'))
			dispatch(loadingLogin(false))
		}
	}
}

export const sendEmail = (data) => {
	return async (dispatch) => {
		dispatch(loadingLogin(true))
		const url = `${URL}/auth/superadmin/forgot/password?email=${data.email}`
		try {
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					accept: 'application/json',
				},
				credentials: 'include',
			}).then((response) => {
				if (response.status && response.status === 400) {
					dispatch(errorLogin('400'))
					dispatch(loadingLogin(false))
					dispatch(sendingSuccess(false))
				}
				if (response.ok) {
					dispatch(loadingLogin(false))
					dispatch(sendingSuccess(true))
					dispatch(errorLogin(''))
				}
			})
		} catch (error) {
			dispatch(errorLogin('error'))
			dispatch(sendingSuccess(false))
			dispatch(loadingLogin(false))
		}
	}
}

export const createNewPassword = (data, token) => {
	return async (dispatch) => {
		dispatch(loadingLogin(true))
		const currentData = {
			token: token,
			password: data.password,
		}
		const url = `${URL}/auth/superadmin/reset/password`
		try {
			const response = await fetch(url, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(currentData),
			})

			if (response.ok) {
				dispatch(createNewPasswordSuccess(true))
				dispatch(loadingLogin(false))
			}
			if (response.status === 401) {
				dispatch(errorLogin('401'))
				dispatch(loadingLogin(false))
			}
			if (response.status === 400) {
				dispatch(errorLogin('400'))
				dispatch(loadingLogin(false))
			}
		} catch (error) {
			console.log('error', error)
			dispatch(errorLogin('error'))
			dispatch(loadingLogin(false))
		}
	}
}

export const loadingLogin = (boolean) => {
	return {
		type: LOADING_LOGIN,
		payload: boolean,
	}
}
export const isAuthUser = (boolean) => {
	return { type: AUTH_USER, payload: boolean }
}

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

const InitialState = {
	authorizationToken: '',
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
		case CREATE_NEW_PASSWORD_SUCCESS:
			return { ...state, resetPasswordSuccess: action.payload }
		default:
			return state
	}
}
