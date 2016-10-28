import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import {
	checkResponseStatus,
	parseResponseToJSON,
	parseJWT,
	isDefined,
	parseQueryString,
	preventBadFacebookHash
	} from './utils'

describe('utils', () => {

	describe('checkResponseStatus()', () => {
		it('should return response', () => {
			const response = { status: 200 }
			expect(checkResponseStatus(response)).to.equal(response)
		})

		it('should throw error', () => {
			const response = { status: 400, statusText: 'broken response' }
			expect(() => checkResponseStatus(response)).to.throw(Error, /broken response/)
		})
	})


	describe('parseResponseToJSON()', () => {
		it('should return object', () => {
			let parsed = false
			const response = { json: () => { parsed = true }}
			parseResponseToJSON(response)
			expect(parsed).to.be.true
		})
	})

	describe('parseJWT()', () => {
		it('should parse valid JSON Web Token', () => {
			const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
			const token = parseJWT(jwt)
			expect(token).to.have.property('header').that.is.an('object')
			expect(token).to.have.property('payload').that.is.an('object')
			expect(token).to.have.property('signature').that.is.an('string')
		})

		it('should return null for invalid token', () => {
			const brokenJWT = 'nR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi'
			expect(() => { return parseJWT(brokenJWT) }).to.not.throw(Error)
			expect(parseJWT(brokenJWT)).to.be.null
		})

	})

	describe('isDefined()', () => {
		it('should return false for undefined', () => {
			expect(isDefined(undefined)).to.be.false
		})

		it('should return false for null', () => {
			expect(isDefined(null)).to.be.false
		})

		it('should return true for boolean', () => {
			expect(isDefined(false)).to.be.true
			expect(isDefined(true)).to.be.true
		})

		it('should return true for object', () => {
			expect(isDefined({})).to.be.true
		})

		it('should return true for string', () => {
			expect(isDefined('')).to.be.true
		})

		it('should return true for number', () => {
			expect(isDefined(-1)).to.be.true
			expect(isDefined(0)).to.be.true
			expect(isDefined(123.123)).to.be.true
		})
	})

	describe('parseQueryString()', () => {
		it('should parse query string', () => {
			expect(parseQueryString('foo=bar').foo).to.equal('bar')
			expect(parseQueryString('foo&bar')).to.deep.equal({ foo: true, bar: true })
			expect(parseQueryString('foo=1&bar=2')).to.deep.equal({ foo: 1, bar: 2 })
		})

		it('should throws an error for invalid params', () => {
			const errPattern = /Non-string values are not allowed./
			expect(() => parseQueryString(0)).to.throw(Error, errPattern)
			expect(() => parseQueryString(() => {})).to.throw(Error, errPattern)
			expect(() => parseQueryString({ foo: 'bar'})).to.throw(Error, errPattern)
		})
	})

	describe('should preventBadFacebookHash()', () => {
		it('should remove messy facebook hash', () => {
			window.location.hash = window.location.hash + '_=_'
			expect(/_=_/.test(window.location.hash)).to.be.true
			preventBadFacebookHash()
			expect(/_=_/.test(window.location.hash)).to.be.false
		})
	})

})
