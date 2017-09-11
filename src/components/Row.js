import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

export default class Row extends Component {
	static PropTypes = {
		item: PropTypes.object.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			isSelected: false,
		}		
	}
	renderCells = () => {
		const keys = Object.keys(this.props.item);
		return keys.map((itemName, index) => {
			return (
				<Cell
					key={index}
					val={this.props.item[itemName]}
				/>
			)
		}) 
	}
	render() {
		const {item} = this.props;
		return (
			<tr>
				{this.renderCells()}
				{/*<td>{item.email}</td>*/}
			</tr>
		)
	}
}