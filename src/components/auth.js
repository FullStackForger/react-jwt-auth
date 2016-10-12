import React, {Component, PropTypes} from 'react'

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
		return this.props.children
	}
}