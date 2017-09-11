import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
	static PropTypes = {
		currentPage: PropTypes.number.isRequired,
		numButtons: PropTypes.number,
		onPerPageChange: PropTypes.func,
		onSelectPage: PropTypes.func, 
		handlePerPageSelect: PropTypes.func,
	}
	constructor(props) {
		super(props)
	}
	renderPaginateList = () => {
		const numButtons = this.props.numButtons;
		const numList = [];
		let start = this.props.currentPage - 2; // so the current page is always in the middle
		let end = start + 6;
		start = start < 1 ? start = 1 : start;
		end = end > numButtons ? numButtons : end;
		for (let i = start; i < end; i++) {
			numList.push(i);
		}
		return numList.map((num, idx) => {
			return (
				<li 
					onClick={this.props.handlePaginate}
					role={num}
					key={idx}
				>
					<a>{num}</a>
				</li>
			)
		})
	}
	render() {
		const {numButtons} = this.props;
		return (
			<div className="footer">
				<div className="per-page-wrapper">
					<select onChange={this.props.handlePerPageSelect}>	
						<option value={5}>{5}</option>
						<option selected value={10}>{10}</option>
						<option value={15}>{15}</option>
						<option value={20}>{20}</option>
						<option value={25}>{25}</option>						
					</select>
					<span>Per Page</span>
				</div>
				<div className="paginate-wrapper">
					<ul className="paginate-list">
						{this.renderPaginateList()}						
					</ul>
				</div>
			</div>
		)
	}
}