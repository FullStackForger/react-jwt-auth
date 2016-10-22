import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

import Auth from './Auth'

describe('Auth', () => {

	it('should mount', () => {
		const wrapper = shallow(<Auth />)
		expect(wrapper).to.not.be.an('undefined')
	})

	it('should call componentWillMount', () => {
		sinon.spy(Auth.prototype, 'componentWillMount')
		const wrapper = mount(<Auth />)
		expect(Auth.prototype.componentWillMount.calledOnce).to.equal(true)
	})

	it('should wrap children', () => {
		const wrapper = shallow(
			<Auth>
				<div className="unique" />
			</Auth>
		)
		expect(wrapper.contains(<div className="unique" />)).to.equal(true)
	})
})