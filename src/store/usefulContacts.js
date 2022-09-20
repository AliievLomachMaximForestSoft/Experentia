import { authorizationToken } from '../utils/token'

const GET_USEFUL_CONTACTS = 'GET_USEFUL_CONTACTS'
const DELL_USEFUL_CONTACTS = 'DELL_USEFUL_CONTACTS'
const LOADING_USEFUL_CONTACTS = 'LOADING_USEFUL_CONTACTS'
const IS_CREATE_USEFUL_CONTACTS = 'IS_CREATE_USEFUL_CONTACTS'
const IS_UPDATE_USEFUL_CONTACTS = 'IS_UPDATE_USEFUL_CONTACTS'
const IS_UPDATE_INDEX_USEFUL_CONTACTS = 'IS_UPDATE_INDEX_USEFUL_CONTACTS'

const URL = process.env.REACT_APP_URL

export const getAllUsefulContacts = () => {
	return async (dispatch) => {
		dispatch(loadingUsefulContacts(true))
		const url = `${URL}/admin/useful/contacts`

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
				.then((usefulContacts) => {
					dispatch(getUsefulContacts(usefulContacts))
					dispatch(isCreateUsefulContacts(false))
					dispatch(isUpdateUsefulContacts(false))
					dispatch(deleteUsefulContacts(false))
					dispatch(loadingUsefulContacts(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingUsefulContacts(false))
		}
	}
}

export const createUsefulContact = (data) => {
	return async (dispatch) => {
		dispatch(loadingUsefulContacts(true))
		const url = `${URL}/admin/useful/contacts`

		try {
			fetch(url, {
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
						dispatch(isCreateUsefulContacts(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingUsefulContacts(false))
		}
	}
}

export const updateUsefulContact = (data) => {
	return async (dispatch) => {
		dispatch(loadingUsefulContacts(true))
		const url = `${URL}/admin/useful/contact`
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
			}).then((res) => {
				dispatch(isUpdateUsefulContacts(true))
				return res.json()
			})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingUsefulContacts(false))
		}
	}
}

export const updateIndexUsefulContacts = (data, value) => {
	return async (dispatch) => {
		const url = `${URL}/admin/useful/contacts/order`
		try {
			fetch(url, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${authorizationToken}`,
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			}).then((res) => {
				if (!value) dispatch(isUpdateIndexUsefulContacts(true))
				return res.json()
			})
		} catch (error) {
			console.log('error', error)
		}
	}
}

export const dellUsefulContact = (id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/useful/contact${id}`
		try {
			fetch(url, {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					accept: '*/*',
					Authorization: `Bearer ${authorizationToken}`,
				},
				credentials: 'include',
			}).then(() => {
				dispatch(deleteUsefulContacts(true))
			})
		} catch (error) {
			console.log('error', error)
		}
	}
}

const loadingUsefulContacts = (boolean) => {
	return {
		type: LOADING_USEFUL_CONTACTS,
		payload: boolean,
	}
}

const isUpdateIndexUsefulContacts = (properties) => ({
	type: IS_UPDATE_INDEX_USEFUL_CONTACTS,
	payload: properties,
})

const getUsefulContacts = (usefulContacts) => ({
	type: GET_USEFUL_CONTACTS,
	payload: usefulContacts,
})

const deleteUsefulContacts = (deleteUsefulContacts) => ({
	type: DELL_USEFUL_CONTACTS,
	payload: deleteUsefulContacts,
})

const isCreateUsefulContacts = (isCreateUsefulContacts) => ({
	type: IS_CREATE_USEFUL_CONTACTS,
	payload: isCreateUsefulContacts,
})

const isUpdateUsefulContacts = (isUpdateUsefulContacts) => ({
	type: IS_UPDATE_USEFUL_CONTACTS,
	payload: isUpdateUsefulContacts,
})

const InitialState = {
	usefulContacts: '',
	deleteUsefulContacts: false,
	isCreateUsefulContacts: false,
	isUpdateUsefulContacts: false,
	isUpdateIndexUsefulContacts: false,
	loading: false,
}

export const usefulContactsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_USEFUL_CONTACTS:
			return { ...state, usefulContacts: action.payload, loading: false }
		case DELL_USEFUL_CONTACTS:
			return { ...state, deleteUsefulContacts: action.payload, loading: false }
		case IS_CREATE_USEFUL_CONTACTS:
			return {
				...state,
				isCreateUsefulContacts: action.payload,
				loading: false,
			}
		case IS_UPDATE_USEFUL_CONTACTS:
			return {
				...state,
				isUpdateUsefulContacts: action.payload,
				loading: false,
			}
		case IS_UPDATE_INDEX_USEFUL_CONTACTS:
			return {
				...state,
				isUpdateIndexUsefulContacts: action.payload,
				loading: false,
			}
		case LOADING_USEFUL_CONTACTS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
