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
					cellType={itemName}
				/>
			)
		}) 
	}
	handleInputChange = (e) => {
		this.setState({
			isSelected: !this.state.isSelected
		})
	}
	render() {
		const {item} = this.props;
		return (
			<tr>
				<td>
					<input 
						type="checkbox" 
						checked={this.state.isSelected}
						onChange={this.handleInputChange}
					/>
				</td>
				{this.renderCells()}
			</tr>
		)
	}
}