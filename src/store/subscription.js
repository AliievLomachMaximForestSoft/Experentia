import { getAxios, postAxios } from '../utils/axios'

const USER_SUBSCRIPTION = 'USER_SUBSCRIPTION'
const LOADING_SUBSCRIPTION = 'LOADING_SUBSCRIPTION'
const SUBSCRIPTION_USER = 'SUBSCRIPTION_USER'
const URL = process.env.REACT_APP_URL

export const getSubscription = () => async (dispatch) => {
	dispatch(loadingSubscription(true))
	const url = `${URL}/admin/property/last-subscription`
	const response = await getAxios(url, dispatch)
	if (response.data === 'not found') {
		dispatch(isSubscriptionUser('first'))
		localStorage.setItem('subscription', false)
		dispatch(loadingSubscription(false))
	} else {
		dispatch(subscriptionDetails(response.data))
		dispatch(loadingSubscription(false))
	}
}

export const setSubscriptionData = (data) => async (dispatch) => {
	dispatch(loadingSubscription(true))
	const url = `${URL}/admin/property/subscriptions`
	const response = await postAxios(url, data, dispatch)
	dispatch(subscriptionDetails(response.data))
	dispatch(isSubscriptionUser(true))
	localStorage.setItem('subscription', true)
	dispatch(loadingSubscription(false))
}

export const loadingSubscription = (boolean) => ({
	type: LOADING_SUBSCRIPTION,
	payload: boolean,
})

export const isSubscriptionUser = (boolean) => ({
	type: SUBSCRIPTION_USER,
	payload: boolean,
})

const subscriptionDetails = (data) => ({
	type: USER_SUBSCRIPTION,
	payload: data,
})

const InitialState = {
	subscriptionDetails: '',
	error: '',
	loading: false,
	isSubscription: 'false',
}

export const subscriptionReducer = (state = InitialState, action) => {
	switch (action.type) {
		case USER_SUBSCRIPTION:
			return { ...state, subscriptionDetails: action.payload, loading: false }
		case LOADING_SUBSCRIPTION:
			return { ...state, loading: action.payload }
		case SUBSCRIPTION_USER:
			return { ...state, isSubscription: action.payload }
		default:
			return state
	}
}
