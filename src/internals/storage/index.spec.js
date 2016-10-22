import chai from 'chai'
import jwtAuth from './index'

const expect = chai.expect
const assert = chai.assert

describe('storage', () => {

	describe('on the client', () => {
		before(() => {
			delete require.cache[require.resolve('./index.js')]
		})

		it('is accessible', () => {
			expect(require('./index')).to.exist
		})
	})

	describe('on the server', () => {

		let windowBckp
		before(() => {
			windowBckp = global.window
			delete global.window
			delete require.cache[require.resolve('./index.js')]
		})

		after(() => {
			global.window = windowBckp
		})

		it('is accessible', () => {
			expect(require('./index')).to.exist
		})
	})

})