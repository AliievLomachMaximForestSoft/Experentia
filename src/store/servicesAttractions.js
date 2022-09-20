import { authorizationToken } from '../utils/token'
const GET_ATTRACTIONS = 'GET_ATTRACTIONS'
const GET_ATTRACTION = 'GET_ATTRACTION'
const DELL_ATTRACTIONS = 'DELL_ATTRACTIONS'
const IS_CREATE_ATTRACTION = 'IS_CREATE_ATTRACTION'
const IS_CREATE_UPDATE_ITEM = 'IS_CREATE_UPDATE_ITEM'
const IS_UPDATE_INDEX_ATTRACTIONS = 'IS_UPDATE_INDEX_ATTRACTIONS'
const LOADING_ATTRACTIONS = 'LOADING_ATTRACTIONS'
const SET_GALERY_URL = 'SET_GALERY_URL'
const LOADING_IMAGE = 'LOADING_IMAGE'
const IS_UPLOAD_GALERY = 'IS_UPLOAD_GALERY'

const URL = process.env.REACT_APP_URL

export const getAllAttractions = () => (dispatch) => {
	dispatch(loadingAttractions(true))
	const url = `${URL}/admin/services/attractions`

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
			.then((attractions) => {
				dispatch(getAttractions(attractions))
				dispatch(isCreateAttraction(false))
				dispatch(isUpdateAttraction(false))
				dispatch(loadingAttractions(false))
			})
	} catch (error) {
		dispatch(loadingAttractions(false))
	}
}

export const createAttraction = (data) => {
	return async (dispatch) => {
		dispatch(loadingAttractions(true))
		const url = `${URL}/admin/services/attractions`
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
					return res.json()
				})
				.then(() => {
					dispatch(loadingAttractions(false))
					dispatch(isCreateAttraction(true))
					dispatch(loadImage(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadImage(false))
			dispatch(loadingAttractions(false))
		}
	}
}

export const dellAttraction = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/attraction${id}`
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
				.then((res) => {
					return res.json()
				})
				.then((res) => {
					if (res.statusCode === 500) {
						message()
						console.log('res.statusCode', res.statusCode)
					} else {
						dispatch(deleteAttractions(true))
					}
				})
		} catch (error) {}
	}
}

export const updateAttraction = (data) => {
	return async (dispatch) => {
		dispatch(loadingAttractions(true))
		const url = `${URL}/admin/services/attraction`
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
			})
				.then((res) => {
					dispatch(isUpdateAttraction(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingAttractions(false))
		}
	}
}

export const updateIndexAttractionIndex = (data, value, id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/attractions/order`
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
					if (!value) dispatch(isUpdateIndexAttractions(true))
					return res.json()
				})
				.then((res) => {
					dispatch(deleteAttractions(false))
					dispatch(isUpdateIndexAttractions(false))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

export const sendGaleryAttraction = (newData, galery, edit) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/attraction/photos`
		let count = 0
		let arrLink = []
		let data = []
		dispatch(loadImage(true))
		try {
			galery.map(async (icon) => {
				if (typeof icon === 'object') {
					if (icon.originFileObj) {
						data = new FormData()
						data.append('file', icon.originFileObj)

						const res = await fetch(url, {
							method: 'POST',
							mode: 'cors',
							headers: {
								accept: 'application/json',
								Authorization: `Bearer ${authorizationToken}`,
							},
							credentials: 'include',
							body: data,
						})
						const link = await res.text()
						count++
						dispatch(setGaleryUrl(link))
						arrLink.push(link)
					} else {
						const link = icon.name
							.replace(`${URL}/files/`, '')
							.replaceAll('%2F', '/')
						count++
						dispatch(setGaleryUrl(link))
						arrLink.push(link)
					}
					if (count === galery.length) {
						dispatch(isUploadGalery(arrLink))
						const data = {
							...newData,
							gallery: arrLink,
						}
						if (edit) dispatch(updateAttraction(data))
						else dispatch(createAttraction(data))
					}
				} else {
					if (edit) dispatch(updateAttraction(newData))
					else dispatch(createAttraction(newData))
				}
			})
		} catch (error) {
			console.log('error', error)
			dispatch(loadImage(false))
			dispatch(isUploadGalery([]))
		}
	}
}

const loadingAttractions = (boolean) => {
	return {
		type: LOADING_ATTRACTIONS,
		payload: boolean,
	}
}

const getAttractions = (Attractions) => ({
	type: GET_ATTRACTIONS,
	payload: Attractions,
})

const getAttractionDetails = (Attraction) => ({
	type: GET_ATTRACTION,
	payload: Attraction,
})

const deleteAttractions = (deleteAttraction) => ({
	type: DELL_ATTRACTIONS,
	payload: deleteAttraction,
})

const isUploadGalery = (array) => ({
	type: IS_UPLOAD_GALERY,
	payload: array,
})

const isCreateAttraction = (isCreateAttraction) => ({
	type: IS_CREATE_ATTRACTION,
	payload: isCreateAttraction,
})

const isUpdateAttraction = (isUpdateAttraction) => ({
	type: IS_CREATE_UPDATE_ITEM,
	payload: isUpdateAttraction,
})

const isUpdateIndexAttractions = (Attractions) => ({
	type: IS_UPDATE_INDEX_ATTRACTIONS,
	payload: Attractions,
})

const setGaleryUrl = (url) => ({
	type: SET_GALERY_URL,
	payload: url,
})

const loadImage = (bool) => ({
	type: LOADING_IMAGE,
	payload: bool,
})

const InitialState = {
	attractions: '',
	attractionsDatails: '',
	attractionsSearch: '',
	galeryUrl: '',
	galeryArray: [],
	deleteAttractions: false,
	isUpdateAttractions: false,
	isCreateAttractions: false,
	loading: false,
	isUpdateIndexAttractions: false,
	loadImage: false,
}

export const attractionsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_ATTRACTIONS:
			return { ...state, attractions: action.payload, loading: false }
		case GET_ATTRACTION:
			return { ...state, attractionsDatails: action.payload, loading: false }
		case DELL_ATTRACTIONS:
			return { ...state, deleteAttractions: action.payload, loading: false }
		case IS_CREATE_ATTRACTION:
			return { ...state, isCreateAttractions: action.payload, loading: false }
		case IS_UPDATE_INDEX_ATTRACTIONS:
			return {
				...state,
				isUpdateIndexAttractions: action.payload,
				loading: false,
			}
		case IS_CREATE_UPDATE_ITEM:
			return {
				...state,
				isUpdateAttractions: action.payload,
			}

		case LOADING_IMAGE:
			return {
				...state,
				loadImage: action.payload,
			}
		case IS_UPLOAD_GALERY:
			return {
				...state,
				galeryArray: action.payload,
			}
		case SET_GALERY_URL:
			return {
				...state,
				galeryUrl: action.payload,
			}

		case LOADING_ATTRACTIONS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
