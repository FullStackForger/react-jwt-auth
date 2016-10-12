import Storage from './storage'

export default new Storage({
    storage: (window.localStorage) ? localStorage : null
})