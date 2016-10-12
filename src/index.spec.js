import chai from 'chai'
import jwtAuth from './index'
import {Auth, Google, Facebook} from './index'

const expect = chai.expect
const assert = chai.assert

describe('react-jwt-auth', () => {

  it('should exist', () => {
    expect(app).to.exist
  })



  describe('components', () => {
    it('should expose Auth', () => {
      assert.isFunction(Auth)
      assert.isFunction(jwtAuth.Auth)
    })

    it('should expose Facebook', () => {
      assert.isFunction(Facebook)
      assert.isFunction(jwtAuth.Facebook)
    })

    it('should expose Google', () => {
      assert.isFunction(Google)
      assert.isFunction(jwtAuth.Google)
    })
  })

  describe('api', () => {

    it('should expose init', () => {
      assert.isFunction(jwtAuth.init)
    })

    it('should expose isAuthenticated', () => {
      assert.isFunction(jwtAuth.isAuthenticated)
    })

    it('should expose login', () => {
      assert.isFunction(jwtAuth.login)
    })

    it('should expose logout', () => {
      assert.isFunction(jwtAuth.logout)
    })

    it('should expose signup', () => {
      assert.isFunction(jwtAuth.signup)
    })

    it('should expose getToken', () => {
      assert.isFunction(jwtAuth.getToken)
    })

    it('should expose setToken', () => {
      assert.isFunction(jwtAuth.setToken)
    })

    it('should expose refreshToken', () => {
      assert.isFunction(jwtAuth.refreshToken)
    })

    it('should expose getAuthHeader', () => {
      assert.isFunction(jwtAuth.getAuthHeader)
    })

    it('should expose getProfile', () => {
      assert.isFunction(jwtAuth.getProfile)
    })

    it('should expose updateProfile', () => {
      assert.isFunction(jwtAuth.updateProfile)
    })
  })


})