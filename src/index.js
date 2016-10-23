import { isAuthenticated, getToken, setToken, getAuthHeader } from './shared'
import { login, logout, signup, refreshToken } from './local'
import { getProfile, updateProfile } from './user'

import Facebook from './components/Facebook'
export { Facebook }
import Google from './components/Google'
export { Google }

import Auth from './components/Auth'
export {Auth}

export default {
	Auth,
	Facebook,
	Google,
	isAuthenticated,
	login,
	logout,
	signup,
	getToken,
	setToken,
	refreshToken,
	getAuthHeader,
	getProfile,
	updateProfile
}