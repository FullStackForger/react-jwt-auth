import { configOpts } from './defaults'

class Config {
    constructor(opts = configOpts) {
        this.assign(opts)
    }
}

Config.prototype.defaults = configOpts

Config.prototype.assign = function (opts) {
    let config = this
    Object.keys(configOpts).map((key) =>  {
        config[key] = opts.hasOwnProperty(key)
            ? opts[key]
            : configOpts[key]
    })
} 

export default new Config () 