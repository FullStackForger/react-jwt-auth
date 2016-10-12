import { isAuthenticated, getToken, setToken, getAuthHeader } from './shared'
import { login, logout, signup, refreshToken } from './local'
import { getProfile, updateProfile } from './user'

import Facebook from './components/facebook'
export { Facebook }
import Google from './components/google'
export { Google }

import Auth from './components/auth'
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