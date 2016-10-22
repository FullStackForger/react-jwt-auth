import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

describe('Google', () => {
	let Google

	describe('on the client', () => {
		before(() => {
			delete require.cache[require.resolve('./Google')]
			Google = require('./Google').default
		})

		runSuite()
	})

	describe('on the server', () => {
		let windowBckp

		before(() => {
			windowBckp = global.window
			delete global.window
			delete require.cache[require.resolve('./Google')]
			Google = require('./Google').default
		})

		after(() => {
			global.window = windowBckp
		})

		runSuite()
	})

	function runSuite() {
		it('should mount', () => {
			const wrapper = mount(<Google clientId="xx"/>)
			expect(wrapper).to.not.be.an('undefined')
		})

		it('should wrap children', () => {
			const wrapper = shallow(
				<Google clientId="xx">
					<div className="unique" />
				</Google>
			)
			expect(wrapper.contains(<div className="unique" />)).to.equal(true)
		})
	}
})

