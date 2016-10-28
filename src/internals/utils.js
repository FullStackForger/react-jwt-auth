import enverse from 'enverse'

export const checkResponseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const parseResponseToJSON = (response) => {
  return response.json()
}

export const parseJWT = (token) => {
  if (!token) return null
  let base64Url = token
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  let parts = base64.split('.')
  if (parts.length != 3) return null

  try {
    let [headerRaw, payloadRaw, signatureRaw] = parts

    let header = JSON.parse(atob(headerRaw))
    let payload = JSON.parse(atob(payloadRaw))
    let signature = atob(signatureRaw)
    return {
      header,
      payload,
      signature
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

export const isDefined = (value) => {
	return value !== undefined && value !== null
}

export const parseQueryString = (str) => {
	let obj = {};
	let key;
	let value;
	(str || '').split('&').forEach((keyValue) => {
		if (keyValue) {
			value = keyValue.split('=');
			key = decodeURIComponent(value[0]);
			obj[key] = isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
		}
	});
	return obj;
}

// HotFix: Facebook redirects back with '_=_' hash which breaks the app
export const preventBadFacebookHash = () => {
	const fbHashAppendix = /_=_/
	if (enverse.is.browser && enverse.has.window) {
		if (fbHashAppendix.test(window.location.hash)) {
			window.location.hash = window.location.hash.replace(fbHashAppendix, '')
		}
	}
}
