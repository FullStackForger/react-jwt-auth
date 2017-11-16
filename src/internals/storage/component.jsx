// Storage Component for React
// ------------------------------------------------------------------
// It stores data in `localStorage`, `sessionStorage` or caches it
// Additionally it makes data available between different components
//
// Inspired by:
//  - https://github.com/yuanyan/react-storage
//  - https://github.com/sahat/satellizer/blob/master/src/storage.ts
// ------------------------------------------------------------------

import React from 'react'
import PropTypes from 'prop-types'
import Storage from './storage'

export default class StorageComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillUpdate() {
		if(this.props.autoSave) {
			this.save();
			this.storage = new Storage()
		}
	}

  save() {
		var value = this.props.useRaw
			? this.props.value
			: JSON.stringify(this.props.value);

		Storage.set(this.props.name, value);
	}

	render() {
		return `[property value for ${this.props.name}]`
	}
}

Storage.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.array
	]),
	useRaw: PropTypes.bool,
	autoSave: PropTypes.bool,
	cache: PropTypes.object,
	storage: PropTypes.object
},

Storage.defaultProps = DataStore.defaults

Storage.get = (key) => (this.storage.get(key))

Storage.set = (key, value) => (this.storage.remove(key, value))

Storage.remove = (key) => (this.storage.remove(key))