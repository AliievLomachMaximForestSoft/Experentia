import enUS from 'antd/lib/locale/en_US'

const LOADING_LOCAL = 'LOADING_LOCAL'
const GET_LOCAL = 'GET_LOCAL'

//actions
const loaderLocal = (boolean) => {
	return {
		type: LOADING_LOCAL,
		payload: boolean,
	}
}

export const getLocal = (local) => {
	return {
		type: GET_LOCAL,
		payload: local,
	}
}

const InitialState = {
	local: enUS,
	loadingLocal: false,
}

export const localReducer = (state = InitialState, action) => {
	switch (action.type) {
		case LOADING_LOCAL: {
			return { ...state, loadingLocal: action.payload }
		}
		case GET_LOCAL: {
			return {
				...state,
				local: action.payload,
			}
		}
		default:
			return state
	}
}
