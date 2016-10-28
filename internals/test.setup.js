import jsdom from 'jsdom'
import atob from 'atob'

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

global.atob = atob
