import chai from 'chai'
import app from './index'

const expect = chai.expect

describe('app', () => {

  it('should exist', () => {
    expect(app).to.exist
  })

  it('should have foo', () => {
    expect(app.foo).to.equal('bar')
  })
})