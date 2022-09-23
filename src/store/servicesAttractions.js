import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'
const GET_ATTRACTIONS = 'GET_ATTRACTIONS'
const DELL_ATTRACTIONS = 'DELL_ATTRACTIONS'
const IS_CREATE_ATTRACTION = 'IS_CREATE_ATTRACTION'
const IS_CREATE_UPDATE_ITEM = 'IS_CREATE_UPDATE_ITEM'
const IS_UPDATE_INDEX_ATTRACTIONS = 'IS_UPDATE_INDEX_ATTRACTIONS'
const LOADING_ATTRACTIONS = 'LOADING_ATTRACTIONS'
const SET_GALERY_URL = 'SET_GALERY_URL'
const LOADING_IMAGE = 'LOADING_IMAGE'
const IS_UPLOAD_GALERY = 'IS_UPLOAD_GALERY'
const INDEX_DEL_ATTRACTION = 'INDEX_DEL_ATTRACTION'

const URL = process.env.REACT_APP_URL

export const getAllAttractions = () => async (dispatch) => {
	dispatch(loadingAttractions(true))
	const url = `${URL}/admin/services/attractions`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getAttractions(response.data))
		dispatch(isCreateAttraction(false))
		dispatch(isUpdateAttraction(false))
	}
	dispatch(loadingAttractions(false))
}

export const createAttraction = (data) => async (dispatch) => {
	dispatch(loadingAttractions(true))
	const url = `${URL}/admin/services/attractions`
	const response = await postAxios(url, data, dispatch)
	if (response) {
		dispatch(isCreateAttraction(true))
		dispatch(loadImage(false))
	}
	dispatch(loadingAttractions(false))
}

export const dellAttraction = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/services/attraction${id}`
	const response = await dellAxios(url, dispatch, message)
	response && dispatch(deleteAttractions(true))
}

export const updateAttraction = (data) => async (dispatch) => {
	dispatch(loadingAttractions(true))
	const url = `${URL}/admin/services/attraction`
	const response = await putAxios(url, data, dispatch)
	response && dispatch(isUpdateAttraction(true))
}

export const updateIndexAttractionIndex = (data, value) => async (dispatch) => {
	const url = `${URL}/admin/services/attractions/order`
	const response = await patchAxios(url, data, dispatch)
	if (!value && response) dispatch(isUpdateIndexAttractions(true))
	dispatch(deleteAttractions(false))
	dispatch(isUpdateIndexAttractions(false))
}

export const sendGaleryAttraction =
	(newData, galery, edit) => async (dispatch) => {
		const url = `${URL}/admin/services/attraction/photos`
		let count = 0
		let arrLink = []
		let data = []
		dispatch(loadImage(true))
		galery.map(async (icon) => {
			if (typeof icon === 'object') {
				if (icon.originFileObj) {
					data = new FormData()
					data.append('file', icon.originFileObj)

					const response = await postAxios(url, data, dispatch)
					if (response) {
						const link = response.data
						count++
						dispatch(setGaleryUrl(link))
						arrLink.push(link)
					}
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
	}

const loadingAttractions = (boolean) => ({
	type: LOADING_ATTRACTIONS,
	payload: boolean,
})

const getAttractions = (Attractions) => ({
	type: GET_ATTRACTIONS,
	payload: Attractions,
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

export const indexDelItemAttraction = (index) => ({
	type: INDEX_DEL_ATTRACTION,
	payload: index,
})

const InitialState = {
	attractions: '',
	attractionsSearch: '',
	galeryUrl: '',
	galeryArray: [],
	deleteAttractions: false,
	isUpdateAttractions: false,
	isCreateAttractions: false,
	loading: false,
	isUpdateIndexAttractions: false,
	loadImage: false,
	indexDelItem: null,
}

export const attractionsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case INDEX_DEL_ATTRACTION:
			return { ...state, indexDelItem: action.payload }
		case GET_ATTRACTIONS:
			return { ...state, attractions: action.payload, loading: false }
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
