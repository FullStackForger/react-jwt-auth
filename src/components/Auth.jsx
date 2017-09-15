import React, {Component} from 'react'
import PropTypes from 'prop-types'

import config from '../internals/config'
import { preventBadFacebookHash } from '../internals/utils'

export default class Auth extends Component {
	constructor (props) {
		super(props)
		config.assign(props)
	}

	componentWillMount() {
		preventBadFacebookHash()
	}
	render() {
		return this.props.children || null
	}
}