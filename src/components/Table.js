import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const endPoint = 'http://localhost:8080/data';
export default class Table extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 0,
			search: '',
			filters: {},
			items: [],
			itemsPerPage: 10,
		}
	}
	componentDidMount() {
		fetch(endPoint)
			.then(res => res.json())
			.then((data) => {
				this.setState({
					items: [...data],
				})
			})
	}
	renderRows = () => {
		return this.state.items.map((item, idx) => {
			return (
				<Row
					item={item}
					key={idx}
				/>
			) 
		})
	}


	render() {
		return (
			<div className="table-wrapper">
				<table>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		)
	}
}