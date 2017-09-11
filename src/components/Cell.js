import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {
	static PropTypes = {
		filters: PropTypes.objectOf(PropTypes.bool).isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			contentEditable: false,
		}		
	}
	render(){
		const {cellType, val} = this.props;
		let display = this.props.filters[cellType] ? 'table-cell' : 'none';
		return (
			<td
				style={{display: display}}
				data-celltype={cellType}
			>
				{val}
			</td>
		)
	}
	
}