import {
	dellAxios,
	getAxios,
	postAxios,
	putAxios,
	patchAxios,
} from '../utils/axios'
const GET_CATEGORY_ITEMS = 'GET_CATEGORY_ITEMS'
const DELL_CATEGORY_ITEMS = 'DELL_CATEGORY_ITEMS'
const IS_CREATE_CATEGORY_ITEM = 'IS_CREATE_CATEGORY_ITEM'
const IS_CREATE_UPDATE_ITEM = 'IS_CREATE_UPDATE_ITEM'
const IS_UPDATE_INDEX_CATEGORY_ITEMS = 'IS_UPDATE_INDEX_CATEGORY_ITEMS'
const LOADING_CATEGORY_ITEMS = 'LOADING_CATEGORY_ITEMS'
const URL = process.env.REACT_APP_URL

export const getAllCategoryItems = (id) => async (dispatch) => {
	dispatch(loadingCategoryItems(true))
	const url = `${URL}/admin/services/menu/categories/${Number(id)}`
	const response = await getAxios(url, dispatch)
	if (response) {
		dispatch(getCategoryItems(response.data))
		dispatch(isCreateCategoryItem(false))
		dispatch(isUpdateCategoryItem(false))
	}
	dispatch(loadingCategoryItems(false))
}

export const createCategory = (data) => async (dispatch) => {
	dispatch(loadingCategoryItems(true))
	const url = `${URL}/admin/services/menu/categories`
	const response = await postAxios(url, data, dispatch)
	response && dispatch(isCreateCategoryItem(true))
	dispatch(loadingCategoryItems(false))
}

export const dellCategoryItem = (id, message) => async (dispatch) => {
	const url = `${URL}/admin/services/menu/category${id}`
	const response = await dellAxios(url, dispatch, message)
	response && dispatch(deleteCategoryItems(true))
}

export const updateCategoryItem = (data) => async (dispatch) => {
	dispatch(loadingCategoryItems(true))
	const url = `${URL}/admin/services/menu/category`
	const response = await putAxios(url, data, dispatch)
	response && dispatch(isUpdateCategoryItem(true))
}

export const updateIndexCategoryIndex =
	(data, value, id) => async (dispatch) => {
		const url = `${URL}/admin/services/menu/categories/order`
		const response = await patchAxios(url, data, dispatch)
		if (!value && response) dispatch(isUpdateIndexCategoryItems(true))
		dispatch(deleteCategoryItems(false))
	}

const loadingCategoryItems = (boolean) => ({
	type: LOADING_CATEGORY_ITEMS,
	payload: boolean,
})

const getCategoryItems = (categoryItems) => ({
	type: GET_CATEGORY_ITEMS,
	payload: categoryItems,
})

const deleteCategoryItems = (deleteCategoryItem) => ({
	type: DELL_CATEGORY_ITEMS,
	payload: deleteCategoryItem,
})

const isCreateCategoryItem = (isCreateCategoryItem) => ({
	type: IS_CREATE_CATEGORY_ITEM,
	payload: isCreateCategoryItem,
})

const isUpdateCategoryItem = (isUpdateCategoryItem) => ({
	type: IS_CREATE_UPDATE_ITEM,
	payload: isUpdateCategoryItem,
})

export const isUpdateIndexCategoryItems = (categoryItems) => ({
	type: IS_UPDATE_INDEX_CATEGORY_ITEMS,
	payload: categoryItems,
})

const InitialState = {
	categoryItems: '',
	categoryItemsSearch: '',
	deleteCategoryItems: false,
	isUpdateCategoryItems: false,
	isCreateCategoryItems: false,
	indexCategoryItems: false,
	loading: false,
}

export const categoryItemsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_CATEGORY_ITEMS:
			return { ...state, categoryItems: action.payload, loading: false }
		case DELL_CATEGORY_ITEMS:
			return { ...state, deleteCategoryItems: action.payload, loading: false }
		case IS_CREATE_CATEGORY_ITEM:
			return { ...state, isCreateCategoryItems: action.payload, loading: false }
		case IS_UPDATE_INDEX_CATEGORY_ITEMS:
			return {
				...state,
				indexCategoryItems: action.payload,
				loading: false,
			}
		case IS_CREATE_UPDATE_ITEM:
			return {
				...state,
				isUpdateCategoryItems: action.payload,
			}
		case LOADING_CATEGORY_ITEMS:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
