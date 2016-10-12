import config from './internals/config'
import { fetchOpts } from './internals/defaults'
import { parseResponseToJSON, checkResponseStatus } from './internals/utils'
import { setToken, getToken, removeToken, getAuthHeader } from './shared'

export const signup = (userData, options) => {
	let {baseUrl, signupUrl} = config
	let url = baseUrl + signupUrl
	let opts = Object.assign({}, fetchOpts, {
		method: 'POST',
		body: JSON.stringify(userData)
	})

	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))
}

export const login = (userData, options) => {
	let {baseUrl, loginUrl} = config
	let url = baseUrl + loginUrl
	let opts = Object.assign({}, fetchOpts, {
		method: 'POST',
		body: JSON.stringify(userData)
	}, options)

	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))
}

export const logout = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!!getToken()) {
				removeToken()
				resolve({success: true})
			} else {
				reject(new Error('You are trying to log out unauthenticated user.'))
			}
		})
	})
}

export const refreshToken = (options) => {
	let {baseUrl, refreshUrl} = config
	let url = baseUrl + refreshUrl
	let opts = Object.assign({}, fetchOpts, {
		method: 'GET',
		headers: Object.assign({},
			fetchOpts.headers,
			getAuthHeader()
		),
	}, options)
	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))
}

export const exchangeCodeForToken = (provider, oauthData, options) => {
	let {baseUrl, oauthUrl} = config
	let url = baseUrl + oauthUrl.replace('{provider}', provider)
	let opts = Object.assign({}, fetchOpts, {
		method: 'POST',
		body: JSON.stringify(oauthData)
	}, options)
	return fetch(url, opts)
		.then(checkResponseStatus)
		.then(parseResponseToJSON)
		.then((data) => ({token: setToken(data.token)}))
}