export const configOpts = {
	tokenName: 'if-token',
	authHeader: 'Authorization',
	authToken: 'Bearer',
	baseUrl: '/',
	loginUrl: 'auth/login',
	signupUrl: 'auth/signup',
	refreshUrl: 'auth/refresh',
	oauthUrl: 'auth/{provider}', // dynamic
	profileUrl: 'me'
}

export const fetchOpts = {
	method: 'GET',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
}