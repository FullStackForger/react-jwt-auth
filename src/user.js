import config from './internals/config'
import { fetchOpts } from './internals/defaults'
import { parseResponseToJSON, checkResponseStatus } from './internals/utils'
import { getAuthHeader } from './shared'

export const getProfile = (options) => {
	let {baseUrl, profileUrl} = config
	let url = baseUrl + profileUrl
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
}

export const updateProfile = (profileData, options) => {
	let {baseUrl, profileUrl} = config
	let url = baseUrl + profileUrl
	let opts = Object.assign({}, fetchOpts, {
		method: 'PUT',
		headers: Object.assign({},
			fetchOpts.headers,
			getAuthHeader()
		),
		body: JSON.stringify(profileData)
	}, options)
	return fetch(url, opts)
		.then(checkResponseStatus)
}