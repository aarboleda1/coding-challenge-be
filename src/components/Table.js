import React, { Component } from 'react';
import Footer from './Footer';
import PropTypes from 'prop-types';
import Row from './Row';

const endPoint = 'http://localhost:8080/data';
export default class Table extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
			search: '',
			filters: {},
			allItems: [],
			currentItems: [],
			itemsPerPage: 10,
			sortBy: '',
			numButtons: 0,
			action: '',
		}
	}

	// const regex = new RegExp(target, 'gi'); 
	
	componentDidMount() {
		fetch(endPoint)
			.then(res => res.json())
			.then((data) => {
				const currentDisplay  = data.slice(0, 15);
				this.setState({
					currentItems: [...currentDisplay],
					allItems: [...data],
					numButtons: (data.length / this.state.itemsPerPage)
				})
			})
	}
	renderRows = (items) => { //items are used for filtered listst
		const {currentPage, itemsPerPage, allItems} = this.state;
		let start = (currentPage - 1) * itemsPerPage;
		let end = start + itemsPerPage;
		// let rows = this.state.items || allItems.slice(start, end);
		let rows;
		if (this.state.action === 'sort') {
			rows = this.state.currentItems
		}	else if (this.state.action === 'paginate') {
			rows = allItems.slice(start, end);
		} else {
			rows = allItems.slice(start, end);
		}
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
		if (this.state.currentItems[0]) { 
			const items = this.state.currentItems[0];
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
		let items = this.state.currentItems.sort((a, b) => {
			if (a[sortByType] > b[sortByType]) 	return 1;
			
			if (a[sortByType] < b[sortByType]) return -1;

			return 0;
		})
		this.setState({
			currentItems: [...items],
			action: 'sort',
		})
	}
	handlePaginate = (e) => {
		let page = parseInt(e.target.outerText);
		this.setState({
			currentPage: page,
			action: 'paginate',
		})
	}
	handlePerPageSelect = (e) => {
		let page = parseInt(e.target.value)
		const newItems = this.state.currentItems.slice(0, page); 
		this.setState({
			itemsPerPage: page,
			currentItems: newItems,
		})
	}

	render() {
		return (
			<div className="table-wrapper">
				<table className="table">
					<tbody>
						<tr className="table-header">
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
				<Footer
					handlePerPageSelect={this.handlePerPageSelect}
					currentPage={this.state.currentPage}
					numButtons={this.state.numButtons}
					handlePaginate={this.handlePaginate}
				/>
			</div>
		)
	}
}