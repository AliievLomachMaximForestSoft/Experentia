import { authorizationToken } from '../utils/token'
const GET_TOP_PROPERTIES = 'GET_TOP_PROPERTIES'
const ERROR_TOP_PROPERTIES = 'ERROR_TOP_PROPERTIES'
const LOADING_TOP_PROPERTIES = 'LOADING_TOP_PROPERTIES'
const GET_TOP_PROPERTY = 'GET_TOP_PROPERTY'
const GET_TOP_PROPERTY_SEARCH = 'GET_TOP_PROPERTY_SEARCH'
const DELL_TOP_PROPERTY = 'DELL_TOP_PROPERTY'
const IS_CREATE_PROPERTY = 'IS_CREATE_PROPERTY'
const IS_UPDATE_INDEX_PROPERTIES = 'IS_UPDATE_INDEX_PROPERTIES'

const URL = process.env.REACT_APP_URL

export const getAllTopProperties = () => {
	return async (dispatch) => {
		dispatch(loadingTopProperties(true))

		const url = `${URL}/superadmin/top-properties`

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
				.then((properties) => {
					dispatch(getTopProperties(properties))
					dispatch(errorTopProperties(''))
					dispatch(isCreateTopProperty(false))
					dispatch(loadingTopProperties(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingTopProperties(false))
			dispatch(errorTopProperties('error'))
		}
	}
}

export const createTopProperties = (property, index) => {
	return async (dispatch) => {
		dispatch(loadingTopProperties(true))
		const url = `${URL}/superadmin/add/top-property`
		const data = { property: { ID: property.ID }, index: index }
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
						dispatch(isCreateTopProperty(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errCreate', res)
						dispatch(errorTopProperties(res.statusCode))
						dispatch(loadingTopProperties(false))
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingTopProperties(false))
			dispatch(errorTopProperties('error'))
		}
	}
}

export const updateIndexTopProperties = (data, value) => {
	return async (dispatch) => {
		const url = `${URL}/superadmin/top-property/change/indexes`
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
			})
				.then((res) => {
					if (!value) dispatch(isUpdateIndexTopProperty(true))
					return res.json()
				})
				.then((properties) => {
					dispatch(getTopProperties(properties))
					dispatch(errorTopProperties(''))
					dispatch(isUpdateIndexTopProperty(false))
					dispatch(deleteTopProperty(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingTopProperties(false))
			dispatch(errorTopProperties('error'))
		}
	}
}

export const dellTopPropertiy = (id) => {
	return async (dispatch) => {
		dispatch(loadingTopProperties(true))
		const url = `${URL}/superadmin/top-property${id}` //?
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
					dispatch(deleteTopProperty(true))
					dispatch(errorTopProperties(''))
					dispatch(loadingTopProperties(false))
				})
		} catch (error) {
			dispatch(loadingTopProperties(false))
			dispatch(errorTopProperties('error'))
		}
	}
}

const loadingTopProperties = (boolean) => {
	return {
		type: LOADING_TOP_PROPERTIES,
		payload: boolean,
	}
}

export const getTopProperties = (properties) => ({
	type: GET_TOP_PROPERTIES,
	payload: properties,
})

const deleteTopProperty = (deleteTopProperty) => ({
	type: DELL_TOP_PROPERTY,
	payload: deleteTopProperty,
})

const isCreateTopProperty = (isCreateTopProperty) => ({
	type: IS_CREATE_PROPERTY,
	payload: isCreateTopProperty,
})

const isUpdateIndexTopProperty = (properties) => ({
	type: IS_UPDATE_INDEX_PROPERTIES,
	payload: properties,
})

const errorTopProperties = (textError) => ({
	type: ERROR_TOP_PROPERTIES,
	payload: textError,
})

const InitialState = {
	topProperties: '',
	topPropertyDatails: '',
	topPropertySearch: '',
	deleteTopProperty: false,
	isUpdateIndexTopProperty: false,
	isCreateTopProperty: false,
	error: '',
	loading: false,
}

export const topPropertiesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_TOP_PROPERTIES:
			return { ...state, topProperties: action.payload, loading: false }
		case GET_TOP_PROPERTY:
			return { ...state, topPropertyDatails: action.payload, loading: false }
		case DELL_TOP_PROPERTY:
			return { ...state, deleteTopProperty: action.payload, loading: false }
		case IS_CREATE_PROPERTY:
			return { ...state, isCreateTopProperty: action.payload, loading: false }
		case IS_UPDATE_INDEX_PROPERTIES:
			return {
				...state,
				isUpdateIndexTopProperty: action.payload,
				loading: false,
			}
		case ERROR_TOP_PROPERTIES:
			return { ...state, error: action.payload }
		case LOADING_TOP_PROPERTIES:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
