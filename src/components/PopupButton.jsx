import React from 'react'
import PropTypes from 'prop-types'
import { parseQueryString } from '../internals/utils'

const propTypes = {
	style: PropTypes.object,
	width: PropTypes.number,
	height: PropTypes.number,
	popupUrl: PropTypes.string.isRequired,
	autoClose: PropTypes.bool,
	autoCloseUri: PropTypes.string,
	onClick: PropTypes.func,
	onClose: PropTypes.func,
	polling: PropTypes.bool
}

const defaultProps = {
	style: {},
	width: 500,
	height: 500,
	polling: true,
	autoClose: true,
}

class PopupButton extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false
		}

		this.onClick = this.onClick.bind(this)
	}

	componentDidUpdate() {
		if (this.state.open) {
			this.open()
		}
	}

	onClick() {
		this.setState({ open: true })
		if (this.props.onClick) {
			this.props.onClick()
		}
	}

	onClose(queryStringData) {
		this.setState({ open: false })
		if (this.props.onClose) {
			this.props.onClose(queryStringData)
		}
	}

	open() {
		let { height, width } = this.props
		let options = {
			width: width,
			height: height,
			top: window.screenY + ((window.outerHeight - height) / 2.5),
			left: window.screenX + ((window.outerWidth - width) / 2),
			resizable: 0, // IE only
			scrollbars: 0 // IE, Firefox & Opera only
		}

		const popup = window.open(this.props.popupUrl, '_blank', PopupButton.generateSpec(options))
		popup.focus()

		if (this.props.popupUrl === 'about:blank') {
			popup.document.body.innerHTML = 'Loading...'
		}

		if (this.props.polling) {
			this.pollPopup(popup)
		}
	}

	pollPopup(window) {
		const autoCloseUriPath = !this.props.autoCloseUri
			? document.location.origin + document.location.pathname
			: this.props.autoCloseUri

		let queryStringData = {}
		let closing = false

		const polling = setInterval(() => {
			if (!window || window.closed || closing) {
				clearInterval(polling)
				if (queryStringData.error) {
					console.error(queryStringData.error)
				}
				this.onClose(queryStringData)
				window.close()
			}
			try {
				const popupUrlPath = window.location.origin + window.location.pathname

				// todo: decouple, use handler to this outside
				if (popupUrlPath === autoCloseUriPath) {
					if (window.location.search || window.location.hash) {
						const query = parseQueryString(window.location.search.substring(1).replace(/\/$/, ''))
						const hash = parseQueryString(window.location.hash.substring(1).replace(/[\/$]/, ''))
						queryStringData = Object.assign({}, query, hash)
						closing = this.props.autoClose
					} else {
						console.info('OAuth redirect has occurred but no query or hash parameters were found.')
					}
				}
			} catch (error) {
				// Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
				// A hack to get around same-origin security policy errors in Internet Explorer.
			}
		}, 250)
	}

	renderInternalElement() {
		if (this.props.children instanceof Array) {
			return this.props.children
		}
		return React.cloneElement(this.props.children, {
			onClick: this.onClick
		})
	}

	render() {
		return this.props.children
			? this.renderInternalElement(this.props)
			: <button onClick={this.onClick}
								style={this.props.style}
								className={this.props.className}
				>{this.props.label}</button>
	}
}

PopupButton.generateSpec = (options) => {
	return Object.keys(options).reduce((previous, current, index) => {
		let final = index == 1 ? previous + '=' + options[previous] : previous
		return final + ',' + current + '=' + options[current]
	})
}

PopupButton.defaultProps = defaultProps
PopupButton.propTypes = propTypes

export default PopupButton
