import storage from './internals/storage'
import config from './internals/config'
import { parseJWT } from './internals/utils'

export const setToken = (token) => {
    return storage.set(config.tokenName, token)
}

export const getToken = (asJSON = false) => {
    let token = storage.get(config.tokenName)     
    if (asJSON) return parseJWT(token)
    return token
}

export const removeToken = () => {
    storage.remove(config.tokenName)
}

export const getAuthHeader = () => {
    let token;
    if (isAuthenticated() && config.authHeader && config.authToken) {
        let token = config.authToken + ' ' + getToken()
        return {[config.authHeader]: token }
    }
    return {}    
}

export const isAuthenticated = () => {
    const token = parseJWT(getToken())
    if (!token) return false

    let exp = token.payload.exp
    if (!exp) return true

    let isExpTimestamp = typeof exp === 'number'
    if (!isExpTimestamp) return false
    return Math.round(new Date().getTime() / 1000) < exp
}