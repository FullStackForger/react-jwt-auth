import chai from 'chai'
import jwtAuth from './index'

const expect = chai.expect
const assert = chai.assert

describe('storage', () => {

	before(() => {
		delete require.cache[require.resolve('./storage.js')]
	})

	describe('on the client', () => {
		runSuite()
	})

	describe('on the server', () => {
		let windowBckp

		before(() => {
			windowBckp = global.window
			delete global.window
		})

		after(() => {
			global.window = windowBckp
		})

		runSuite()
	})

	function runSuite () {
		const Storage = require('./storage').default

		it('is accessible', () => {
			expect(Storage).to.exist
		})

		it('is a constructor method', () => {
			const storage = new Storage()
			expect(storage).to.be.an.instanceof(Storage)
		})

		describe('set()', () => {
			it('should return stored value', () => {
				const storage = new Storage()
				const foo = storage.set('foo', 'bar')
				expect(foo).to.equal('bar')
			})
		})

		describe('get()', () => {
			it('should return stored value', () => {
				const storage = new Storage()
				storage.set('foo', 'bar')
				const foo = storage.get('foo')
				expect(foo).to.equal('bar')
			})
		})

	}
})
