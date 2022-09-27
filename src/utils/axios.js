import { setStatus } from '../store/login'
const axios = require('axios')

export const getAxios = async (url, dispatch) => {
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(setStatus(200))
		return response
	} catch (error) {
		dispatch(setStatus(error.response.status))
	}
}

export const postAxios = async (url, data, dispatch) => {
	try {
		const response = await axios.post(url, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(setStatus(200))
		return response
	} catch (error) {
		dispatch(setStatus(error.response.status))
	}
}

export const putAxios = async (url, data, dispatch) => {
	try {
		const response = await axios.put(url, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(setStatus(200))
		return response
	} catch (error) {
		dispatch(setStatus(error.response.status))
	}
}

export const patchAxios = async (url, data, dispatch) => {
	try {
		const response = await axios.patch(url, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(setStatus(200))
		return response
	} catch (error) {
		dispatch(setStatus(error.response.status))
	}
}

export const dellAxios = async (url, dispatch, message) => {
	try {
		const response = await axios.delete(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(setStatus(200))
		console.log('response', response)
		return response
	} catch (error) {
		error.response.status === 409
			? message()
			: dispatch(setStatus(error.response.status))
	}
}
