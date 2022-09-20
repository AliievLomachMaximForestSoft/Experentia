const USER_SUBSCRIPTION = 'USER_SUBSCRIPTION'
const LOADING_SUBSCRIPTION = 'LOADING_SUBSCRIPTION'
const SUBSCRIPTION_USER = 'SUBSCRIPTION_USER'
const URL = process.env.REACT_APP_URL

export const getSubscription = () => {
	return async (dispatch) => {
		dispatch(loadingSubscription(true))

		const url = `${URL}/admin/property/last-subscription`

		try {
			fetch(url, {
				method: 'GET',
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					if (response.data === 'not found') {
						dispatch(isSubscriptionUser('first'))
						localStorage.setItem('subscription', false)
						dispatch(loadingSubscription(false))
					} else {
						dispatch(subscriptionDetails(response))
						dispatch(loadingSubscription(false))
					}
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingSubscription(false))
		}
	}
}

export const setSubscriptionData = (data) => {
	return async (dispatch) => {
		dispatch(loadingSubscription(true))
		const url = `${URL}/admin/property/subscriptions`

		try {
			fetch(url, {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					return response.json()
				})
				.then((response) => {
					dispatch(subscriptionDetails(response))
					dispatch(isSubscriptionUser(true))
					localStorage.setItem('subscription', true)
					dispatch(loadingSubscription(false))
				})
		} catch (error) {
			console.log('error', error)
			dispatch(loadingSubscription(false))
		}
	}
}

export const loadingSubscription = (boolean) => {
	return {
		type: LOADING_SUBSCRIPTION,
		payload: boolean,
	}
}
export const isSubscriptionUser = (boolean) => {
	return { type: SUBSCRIPTION_USER, payload: boolean }
}

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
