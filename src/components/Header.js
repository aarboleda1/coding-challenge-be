import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
	static PropTypes = {
		handleSearch: PropTypes.func.isRequired,
		filters: PropTypes.objectOf(PropTypes.bool).isRequired,
		handleFilterSelect: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props)
	}
	renderFilters = () => {
		let filterKeys = Object.keys(this.props.filters)
		return filterKeys.map((filter) => {
			return (
				<li key={filter}>
					<span className="filter-title">{filter}</span>
					<input type="checkbox" data-filter={filter}checked={this.props.filters[filter]}/>
				</li>
			)
		})
	}
	render() {
		return(
			<div className="header-wrapper">
				<div style={{fontSize: '20px'}}>React Datatable</div>
					<div className="header">
						<div className="search">
							<span>Search</span>
							<input style={{marginLeft: '8px'}}type="text" onChange={this.props.handleSearch}/>
						</div>
						<form onChange={this.props.handleFilterSelect}>
							<ul className="filters">
								{this.renderFilters()}
							</ul>
						</form>
				</div>
			</div>
		)
	}
}