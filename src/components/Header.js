import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<div className="header-wrapper">
				<div>React Datatable</div>	
					<div className="header">
					<form>
						<span>Search</span>
						<input style={{marginLeft: '8px'}}type="text" onChange={this.props.handleSearch}/>
					</form>
					<form>
						<ul>
							<li>
								<input type="checkbox"/>
							</li>
						</ul>
					</form>
				</div>
			</div>
		)
	}
}