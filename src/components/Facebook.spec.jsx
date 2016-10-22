import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

describe('Facebook', () => {
	let Facebook

	describe('on the client', () => {
		before(() => {
			delete require.cache[require.resolve('./Facebook')]
			Facebook = require('./Facebook').default
		})

		runSuite()
	})

	describe('on the server', () => {
		let windowBckp

		before(() => {
			windowBckp = global.window
			delete global.window
			delete require.cache[require.resolve('./Facebook')]
			Facebook = require('./Facebook').default
		})

		after(() => {
			global.window = windowBckp
		})

		runSuite()
	})

	function runSuite() {
		it('should mount', () => {
			const wrapper = mount(<Facebook clientId="xx"/>)
			expect(wrapper).to.not.be.an('undefined')
		})

		it('should wrap children', () => {
			const wrapper = shallow(
				<Facebook clientId="xx">
					<div className="unique" />
				</Facebook>
			)
			expect(wrapper.contains(<div className="unique" />)).to.equal(true)
		})
	}
})

