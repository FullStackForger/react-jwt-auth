import React, { Component, PropTypes } from 'react'
import OAuth2 from './OAuth2'
import env from 'enverse'
import { isClient } from '../internals/utils'

const defaultProps = {
	clientId: null,
	name: 'google',
	label: 'Sign in with Google',
	tokenEndpoint: '/auth/google',
	oauthProvider: 'google',
	oauthEndpoint: 'https://accounts.google.com/o/oauth2/auth',
	redirectUri: env.is.browser ? window.location.origin : undefined,
	requiredUrlParams: ['scope'],
	optionalUrlParams: ['display', 'state'],
	scope: ['profile', 'email'],
	scopePrefix: 'openid',
	scopeDelimiter: ' ',
	display: 'popup',
	oauthType: '2.0',
	popupOptions: { width: 452, height: 533 },
	style: {
		color: '#fff',
		backgroundColor: '#dd4b39',
		border: '1px solid #d54331',
		padding: '5px 15px'
	},
	state: () => encodeURIComponent(Math.random().toString(36).substr(2))
}

export default class Google extends Component {

	render () {
		return (
			<OAuth2 {...this.props}>
				{this.props.children || null}
			</OAuth2>
		)
	}
}

Google.defaultProps = defaultProps
Google.propTypes = OAuth2.propTypes
