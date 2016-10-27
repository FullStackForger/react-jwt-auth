import React, { Component, PropTypes } from 'react'
import OAuth2 from './OAuth2'
import env from 'enverse'
import { isClient } from '../internals/utils'

const defaultProps = {
	clientId: null,
	name: 'facebook',
	label: 'Sign in with Facebook',
	tokenEndpoint: '/auth/facebook',
	oauthProvider: 'facebook',
	oauthEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
	redirectUri: env.is.browser ? window.location.origin + '/' : undefined, // FB requires be followed by trailing slash for FB
	requiredUrlParams: ['display', 'scope'],
	scope: ['email'],
	scopeDelimiter: ',',
	display: 'popup',
	oauthType: '2.0',
	popupOptions: { width: 580, height: 400 },
	style: {
		color: '#fff',
		backgroundColor: '#3b5998',
		border: '1px solid #335190',
		padding: '5px 15px'
	},
	className: 'btn btn-md'
}

export default class Facebook extends Component {

	render () {
		return (
			<OAuth2 {...this.props}>
				{this.props.children || null}
			</OAuth2>
		)
	}
}

Facebook.defaultProps = defaultProps
Facebook.propTypes = OAuth2.propTypes
