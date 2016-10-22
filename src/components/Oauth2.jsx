import React, {Component, PropTypes} from 'react'

import storage from '../internals/storage'
import PopupButton from './PopupButton'
import { exchangeCodeForToken } from '../local'

const propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	clientId: PropTypes.string.isRequired,
	onSignIn: PropTypes.func,
	onSignInSuccess: PropTypes.func,
	onSignInFailed: PropTypes.func,
	tokenEndpoint: PropTypes.string.isRequired,
	oauthProvider: PropTypes.string.isRequired,
	oauthEndpoint: PropTypes.string.isRequired,
	redirectUri: PropTypes.string,
	scope: PropTypes.arrayOf(PropTypes.string),
	scopePrefix: PropTypes.string,
	scopeDelimiter: PropTypes.string,
	state: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	requiredUrlParams: PropTypes.arrayOf(PropTypes.string),
	defaultUrlParams: PropTypes.arrayOf(PropTypes.string),
	responseType: PropTypes.string,
	responseParams: PropTypes.arrayOf(PropTypes.string),
	oauthType: PropTypes.string,
	popupOptions: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number
	}),
	style: PropTypes.object,
	polling: PropTypes.bool
}

const defaultProps = {
	defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
	responseType: 'code',
	responseParams: ['code', 'clientId', 'redirectUri'],
	oauthType: '2.0',
	style: {},
	popupOptions: { width: 500, height: 500 },
	polling: true
}

export default class OAuth2 extends Component {
	constructor(props) {
		super(props)
		//const { name, state, popupOptions, redirectUri, responseType } = params
		this.onClick = this.onClick.bind(this)
		this.onClose = this.onClose.bind(this)
	}

	buildQueryString() {
		const props = this.props
		const urlParamsCategories = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
		const keyValuePairs = [];

		urlParamsCategories.forEach((paramsCategory) => {

			if (!props[paramsCategory] || !props[paramsCategory].forEach) {
				return
			}

			props[paramsCategory].forEach((paramName) => {

				let paramValue = typeof(props[paramName]) === 'function'
					? props[paramName]()
					: props[OAuth2.camelCase(paramName)]

				if (paramName === 'redirect_uri' && !paramValue) {
					return
				}

				if (paramName === 'state') {
					const stateName = props.name + '_state'
					paramValue = encodeURIComponent(storage.get(stateName))
				}

				if (paramName === 'scope' && Array.isArray(paramValue)) {
					paramValue = paramValue.join(props.scopeDelimiter)
					if (props.scopePrefix) {
						paramValue = [props.scopePrefix, paramValue].join(props.scopeDelimiter)
					}
				}

				keyValuePairs.push([paramName, paramValue])
			})
		})

		return keyValuePairs.map(pair => pair.join('=')).join('&')
	}

	onClick() {
		if(this.onSignIn) {
			this.onSignIn(Object.assign({}, this.props))
		}
	}

	onClose(queryStringData) {
		if (!queryStringData.error) {
			const oauthData = {}
			const provider = this.props.oauthProvider
			this.props.responseParams.forEach(prop => {
				switch(prop) {
					case 'code':
						oauthData[prop] = queryStringData.code
						break
					case 'clientId':
					case 'redirectUri':
						oauthData[prop] = this.props[prop]
						break
					default:
						oauthData[prop] = queryStringData[key];
				}
			})

			exchangeCodeForToken(provider, oauthData).then((token) => {
				if (this.props.onSignInSuccess) {
					this.props.onSignInSuccess({token})
				}
			}).catch((error) => {
				if (this.props.onSignInFailed) {
					this.props.onSignInFailed(error)
				}
			})
		}
	}

	render() {
		const props = this.props
		const popupProps = {
			label: props.label,
			width: props.width,
			height: props.height,
			popupUrl: [props.oauthEndpoint, this.buildQueryString()].join('?'),
			redirectUri: props.redirectUri, // todo: remove coupling with popup
			polling: props.polling,
			onClick: this.onClick,
			onClose: this.onClose,
			style: props.style,
			className: props.className
		}

		return (
			<PopupButton {...popupProps}>
				{ this.props.children || null }
			</PopupButton>
		)
	}
}

OAuth2.camelCase = (name) => {
	return name.replace(/([\:\-\_]+(.))/g, (_, separator, letter, offset) => {
		return offset ? letter.toUpperCase() : letter;
	})
}

OAuth2.propTypes = propTypes
OAuth2.defaultProps = defaultProps
