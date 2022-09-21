import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'

const GET_USEFUL_CONTACTS = 'GET_USEFUL_CONTACTS'
const DELL_USEFUL_CONTACTS = 'DELL_USEFUL_CONTACTS'
const LOADING_USEFUL_CONTACTS = 'LOADING_USEFUL_CONTACTS'
const IS_CREATE_USEFUL_CONTACTS = 'IS_CREATE_USEFUL_CONTACTS'
const IS_UPDATE_USEFUL_CONTACTS = 'IS_UPDATE_USEFUL_CONTACTS'
const IS_UPDATE_INDEX_USEFUL_CONTACTS = 'IS_UPDATE_INDEX_USEFUL_CONTACTS'

const URL = process.env.REACT_APP_URL

export const getAllUsefulContacts = () => async (dispatch) => {
	dispatch(loadingUsefulContacts(true))
	const url = `${URL}/admin/useful/contacts`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getUsefulContacts(response.data))
		dispatch(isCreateUsefulContacts(false))
		dispatch(isUpdateUsefulContacts(false))
		dispatch(deleteUsefulContacts(false))
	}
	dispatch(loadingUsefulContacts(false))
}

export const createUsefulContact = (data) => async (dispatch) => {
	dispatch(loadingUsefulContacts(true))
	const url = `${URL}/admin/useful/contacts`
	const response = await postAxios(url, data, dispatch)
	response && dispatch(isCreateUsefulContacts(true))
}

export const updateUsefulContact = (data) => async (dispatch) => {
	dispatch(loadingUsefulContacts(true))
	const url = `${URL}/admin/useful/contact`
	const response = await putAxios(url, data, dispatch)
	response && dispatch(isUpdateUsefulContacts(true))
}

export const updateIndexUsefulContacts = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/useful/contacts/order`
	const response = await patchAxios(url, data, dispatch)
	if (!value && response) dispatch(isUpdateIndexUsefulContacts(true))
}

export const dellUsefulContact = (id) => async (dispatch) => {
	const url = `${URL}/admin/useful/contact${id}`
	const response = await dellAxios(url, dispatch)
	response && dispatch(deleteUsefulContacts(true))
}

const loadingUsefulContacts = (boolean) => ({
	type: LOADING_USEFUL_CONTACTS,
	payload: boolean,
})

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
