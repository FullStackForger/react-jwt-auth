import jwtAuth from './index'
import { expect } from 'chai'

describe('Storage', () => {
	let Storage

	describe('on the client', () => {
		before(() => {
			delete require.cache[require.resolve('./storage.js')]
			Storage = require('./storage').default
		})
		runSuite()
	})

	describe('on the server', () => {
		let windowBckp

		before(() => {
			windowBckp = global.window
			delete global.window
			delete require.cache[require.resolve('./storage.js')]
			Storage = require('./storage').default
		})

		after(() => {
			global.window = windowBckp
		})

		runSuite()
	})

	function runSuite () {

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
