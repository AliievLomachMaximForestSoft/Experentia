import { authorizationToken } from '../utils/token'
const GET_CATEGORY_DISHES = 'GET_CATEGORY_DISHES'
const GET_CATEGORY_DISH = 'GET_CATEGORY_DISH'
const DELL_CATEGORY_DISHES = 'DELL_CATEGORY_DISHES'
const IS_CREATE_CATEGORY_DISH = 'IS_CREATE_CATEGORY_DISH'
const IS_CREATE_UPDATE_DISH = 'IS_CREATE_UPDATE_DISH'
const IS_UPDATE_INDEX_CATEGORY_DISHES = 'IS_UPDATE_INDEX_CATEGORY_DISHES'
const LOADING_CATEGORY_DISHES = 'LOADING_CATEGORY_DISHES'
const INDEX_DEL_CATEGORY_DISHES = 'INDEX_DEL_CATEGORY_DISHES'

const URL = process.env.REACT_APP_URL

export const getAllCategoryDishes = (id) => (dispatch) => {
	dispatch(loadingCategoryDishes(true))
	const url = `${URL}/admin/services/menu/items/${id}`

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
			.then((categoryDishes) => {
				dispatch(getCategoryDishes(categoryDishes))
				dispatch(isCreateCategoryDish(false))
				dispatch(isUpdateCategoryDish(false))
				dispatch(loadingCategoryDishes(false))
				dispatch(deleteCategoryDishes(false))
			})
	} catch (error) {
		dispatch(loadingCategoryDishes(false))
	}
}

const loadingCategoryDishes = (boolean) => {
	return {
		type: LOADING_CATEGORY_DISHES,
		payload: boolean,
	}
}

export const createCategory = (data) => {
	return async (dispatch) => {
		dispatch(loadingCategoryDishes(true))
		const url = `${URL}/admin/services/menu/items`
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
					// if (res.status === 200 || res.status === 201) {
					// }
					if (res.statusCode) {
						dispatch(loadingCategoryDishes(false))
					} else {
						dispatch(isCreateCategoryDish(true))
						dispatch(loadingCategoryDishes(false))
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingCategoryDishes(false))
		}
	}
}

export const dellCategoryDish = (id) => {
	return async (dispatch) => {
		const url = `${URL}/admin/services/menu/item${id}`
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
				dispatch(deleteCategoryDishes(true))
			})
		} catch (error) {}
	}
}

export const updateCategoryDish = (data) => {
	return async (dispatch) => {
		dispatch(loadingCategoryDishes(true))
		const url = `${URL}/admin/services/menu/item`
		try {
			const response = fetch(url, {
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
					dispatch(isUpdateCategoryDish(true))
					return res.json()
				})
				.then((res) => {
					if (res.statusCode) {
						console.log('errUpdate', res)
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingCategoryDishes(false))
		}
	}
}

// const loadingDetailsService = (boolean) => {
// 	return {
// 		type: LOADING_DETAILS_SERVICE,
// 		payload: boolean,
// 	}
// }

const getCategoryDishes = (categoryDishes) => ({
	type: GET_CATEGORY_DISHES,
	payload: categoryDishes,
})

const getCategoryDishDetails = (categoryDish) => ({
	type: GET_CATEGORY_DISH,
	payload: categoryDish,
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
