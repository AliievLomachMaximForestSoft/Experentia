import { authorizationToken } from '../utils/token'
const GET_CATEGORY_ITEMS = 'GET_CATEGORY_ITEMS'
const GET_CATEGORY_ITEM = 'GET_CATEGORY_ITEM'
const DELL_CATEGORY_ITEMS = 'DELL_CATEGORY_ITEMS'
const IS_CREATE_CATEGORY_ITEM = 'IS_CREATE_CATEGORY_ITEM'
const IS_CREATE_UPDATE_ITEM = 'IS_CREATE_UPDATE_ITEM'
const IS_UPDATE_INDEX_CATEGORY_ITEMS = 'IS_UPDATE_INDEX_CATEGORY_ITEMS'
const LOADING_CATEGORY_ITEMS = 'LOADING_CATEGORY_ITEMS'
const URL = process.env.REACT_APP_URL

export const getAllCategoryItems = (id) => (dispatch) => {
	dispatch(loadingCategoryItems(true))
	const url = `${URL}/admin/services/menu/categories/${Number(id)}`

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
			.then((categoryItems) => {
				dispatch(getCategoryItems(categoryItems))
				dispatch(isCreateCategoryItem(false))
				dispatch(isUpdateCategoryItem(false))
				dispatch(loadingCategoryItems(false))
			})
	} catch (error) {
		dispatch(loadingCategoryItems(false))
	}
}

export const createCategory = (data) => {
	return async (dispatch) => {
		dispatch(loadingCategoryItems(true))
		const url = `${URL}/admin/services/menu/categories`
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
				.then((res) => {
					dispatch(loadingCategoryItems(false))
					dispatch(isCreateCategoryItem(true))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingCategoryItems(false))
		}
	}
}

export const dellCategoryItem = (id, message) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/category${id}`
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
					} else {
						dispatch(deleteCategoryItems(true))
					}
				})
		} catch (error) {}
	}
}

export const updateCategoryItem = (data) => {
	return async (dispatch) => {
		dispatch(loadingCategoryItems(true))
		const url = `${URL}/admin/services/menu/category`
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
					dispatch(isUpdateCategoryItem(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingCategoryItems(false))
		}
	}
}

export const updateIndexCategoryIndex = (data, value, id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/categories/order`
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
					if (!value) dispatch(isUpdateIndexCategoryItems(true))
					return res.json()
				})
				.then((res) => {
					dispatch(deleteCategoryItems(false))
					dispatch(isUpdateIndexCategoryItems(false))
				})
		} catch (error) {
			console.log('error', error)
		}
	}
}

const loadingCategoryItems = (boolean) => {
	return {
		type: LOADING_CATEGORY_ITEMS,
		payload: boolean,
	}
}

const getCategoryItems = (categoryItems) => ({
	type: GET_CATEGORY_ITEMS,
	payload: categoryItems,
})

const getCategoryItemDetails = (categoryItem) => ({
	type: GET_CATEGORY_ITEM,
	payload: categoryItem,
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

const isUpdateIndexCategoryItems = (categoryItems) => ({
	type: IS_UPDATE_INDEX_CATEGORY_ITEMS,
	payload: categoryItems,
})

const InitialState = {
	categoryItems: '',
	categoryItemsDatails: '',
	categoryItemsSearch: '',
	deleteCategoryItems: false,
	isUpdateCategoryItems: false,
	isCreateCategoryItems: false,
	loading: false,
}

export const categoryItemsReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_CATEGORY_ITEMS:
			return { ...state, categoryItems: action.payload, loading: false }
		case GET_CATEGORY_ITEM:
			return { ...state, categoryItemsDatails: action.payload, loading: false }
		case DELL_CATEGORY_ITEMS:
			return { ...state, deleteCategoryItems: action.payload, loading: false }
		case IS_CREATE_CATEGORY_ITEM:
			return { ...state, isCreateCategoryItems: action.payload, loading: false }
		case IS_UPDATE_INDEX_CATEGORY_ITEMS:
			return {
				...state,
				isUpdateIndexCategoryItems: action.payload,
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
