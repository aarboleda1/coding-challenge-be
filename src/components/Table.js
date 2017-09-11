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
			allItems: [],
			items: [],
			itemsPerPage: 10,
			sortBy: '',
		}
	}

	// const regex = new RegExp(target, 'gi'); 
	
	componentDidMount() {
		fetch(endPoint)
			.then(res => res.json())
			.then((data) => {
				const currentDisplay  = data.slice(0, 15);
				this.setState({
					items: [...currentDisplay],
					allItems: [...data]
				})
			})
	}
	renderRows = (items) => {
		const rows = items || this.state.items.slice(0,15);
		return rows.map((item, idx) => {
			return (
				<Row
					item={item}
					key={idx}
				/>
			) 
		})
	}

	renderTableHeader = () => {
		if (this.state.items[0]) { 
			const items = this.state.items[0];
			const headers = Object.keys(items);
			return headers.map((header, idx) => {
				return (
					<th
						key={idx}
						onClick={this.sortBy}
						data-celltype={header}
					>
						{header}
					</th>
				)
			})
		}
	}
	sortBy = (e) => {
		let sortByType = e.target.dataset.celltype
		let items = this.state.items.sort((a, b) => {
			if (a[sortByType] > b[sortByType]) 	return 1;
			
			if (a[sortByType] < b[sortByType]) return -1;
			
			return 0;
		})
		this.setState({
			items: [...items],
		})
	}


	render() {
		return (
			<div className="table-wrapper">

				<table className="table">
					<tbody>
						<tr>
							<th>
								<input 
									type="checkbox" 
								/>
							</th>
						  {this.renderTableHeader()}
						</tr>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		)
	}
}