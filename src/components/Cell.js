import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {
	static PropTypes = {

	}
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			contentEditable: false,
		}		
	}
	render(){
		return (
			<td>
				{this.props.val}
			</td>
		)
	}
	
}