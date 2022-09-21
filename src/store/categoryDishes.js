import { dellAxios, getAxios, postAxios, putAxios } from '../utils/axios'

const GET_CATEGORY_DISHES = 'GET_CATEGORY_DISHES'
const GET_CATEGORY_DISH = 'GET_CATEGORY_DISH'
const DELL_CATEGORY_DISHES = 'DELL_CATEGORY_DISHES'
const IS_CREATE_CATEGORY_DISH = 'IS_CREATE_CATEGORY_DISH'
const IS_CREATE_UPDATE_DISH = 'IS_CREATE_UPDATE_DISH'
const IS_UPDATE_INDEX_CATEGORY_DISHES = 'IS_UPDATE_INDEX_CATEGORY_DISHES'
const LOADING_CATEGORY_DISHES = 'LOADING_CATEGORY_DISHES'
const INDEX_DEL_CATEGORY_DISHES = 'INDEX_DEL_CATEGORY_DISHES'

const URL = process.env.REACT_APP_URL

export const getAllCategoryDishes = (id) => async (dispatch) => {
	dispatch(loadingCategoryDishes(true))
	const url = `${URL}/admin/services/menu/items/${id}`
	const response = await getAxios(url, dispatch)
	dispatch(getCategoryDishes(response.data))
	dispatch(isCreateCategoryDish(false))
	dispatch(isUpdateCategoryDish(false))
	dispatch(loadingCategoryDishes(false))
	dispatch(deleteCategoryDishes(false))
}

export const createCategory = (data) => async (dispatch) => {
	dispatch(loadingCategoryDishes(true))
	const url = `${URL}/admin/services/menu/items`
	await postAxios(url, data, dispatch)
	dispatch(isCreateCategoryDish(true))
	dispatch(loadingCategoryDishes(false))
}

export const dellCategoryDish = (id) => async (dispatch) => {
	const url = `${URL}/admin/services/menu/item${id}`
	await dellAxios(url, dispatch)
	dispatch(deleteCategoryDishes(true))
}

export const updateCategoryDish = (data) => async (dispatch) => {
	dispatch(loadingCategoryDishes(true))
	const url = `${URL}/admin/services/menu/item`
	await putAxios(url, data, dispatch)
	dispatch(isUpdateCategoryDish(true))
}

const loadingCategoryDishes = (boolean) => ({
	type: LOADING_CATEGORY_DISHES,
	payload: boolean,
})

const getCategoryDishes = (categoryDishes) => ({
	type: GET_CATEGORY_DISHES,
	payload: categoryDishes,
})

const deleteCategoryDishes = (deleteCategoryDish) => ({
	type: DELL_CATEGORY_DISHES,
	payload: deleteCategoryDish,
})

const isCreateCategoryDish = (isCreateCategoryDish) => ({
	type: IS_CREATE_CATEGORY_DISH,
	payload: isCreateCategoryDish,
})

const isUpdateCategoryDish = (isUpdateCategoryDish) => ({
	type: IS_CREATE_UPDATE_DISH,
	payload: isUpdateCategoryDish,
})

const isUpdateIndexCategoryDishes = (categoryDishes) => ({
	type: IS_UPDATE_INDEX_CATEGORY_DISHES,
	payload: categoryDishes,
})

export const indexDelItem = (index) => ({
	type: INDEX_DEL_CATEGORY_DISHES,
	payload: index,
})

const InitialState = {
	categoryDishes: '',
	categoryDishesDatails: '',
	categoryDishesSearch: '',
	deleteCategoryDishes: false,
	isUpdateCategoryDishes: false,
	isCreateCategoryDishes: false,
	loading: false,
	indexDelItem: null,
}

export const categoryDishesReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_CATEGORY_DISHES:
			return { ...state, categoryDishes: action.payload, loading: false }
		case GET_CATEGORY_DISH:
			return { ...state, categoryDishesDatails: action.payload, loading: false }
		case DELL_CATEGORY_DISHES:
			return { ...state, deleteCategoryDishes: action.payload, loading: false }
		case IS_CREATE_CATEGORY_DISH:
			return {
				...state,
				isCreateCategoryDishes: action.payload,
				loading: false,
			}
		case IS_UPDATE_INDEX_CATEGORY_DISHES:
			return {
				...state,
				isUpdateIndexCategoryDishes: action.payload,
				loading: false,
			}
		case IS_CREATE_UPDATE_DISH:
			return {
				...state,
				isUpdateCategoryDishes: action.payload,
			}
		case INDEX_DEL_CATEGORY_DISHES:
			return {
				...state,
				indexDel: action.payload,
			}
		case LOADING_CATEGORY_DISHES:
			return { ...state, loading: action.payload }
		default:
			return state
	}
}
