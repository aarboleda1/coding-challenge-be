import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Row from './Row';
import Footer from './Footer';

import {getFilters, endPoint} from '../utils/utils'

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
	
	componentDidMount() {
		fetch(endPoint)
			.then(res => res.json())
			.then((data) => {
				const currentDisplay = data.slice(0, this.state.itemsPerPage);
				const filters = getFilters(data[0]);
				this.setState({
					currentItems: [...currentDisplay],
					allItems: [...data],
					numButtons: (data.length / this.state.itemsPerPage),
					filters: filters,
				})				
			})
	}

	renderRows = (items) => { //items are used for filtered listst
		const {currentPage, itemsPerPage, allItems, action, currentItems} = this.state;
		let start = (currentPage - 1) * itemsPerPage;
		let end = start + itemsPerPage;
		let rows;
		console.log('yo')
		if (action === 'sort' || action === 'paginate') {
			rows = currentItems;
		} else if (action === 'search') {
			rows = this.filterAllItems();
		} else {
			rows = allItems.slice(start, end);
		}
		
		return rows.map((item, idx) => {			
			return (
				<Row
					item={item}
					key={idx}
					filters={this.state.filters}
				/>
			) 
		})
	}

	renderTableHeader = () => {
		if (this.state.currentItems[0]) { 
			const items = this.state.currentItems[0];
			let headers = Object.keys(items);
			const filters = this.state.filters;			
			return headers.map((header, idx) => {
				let display = filters[header] ? 'table-cell' : 'none';
				return (
					<th
						style={{display: display}}
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
		let sortByType = e.target.dataset.celltype;
		let items = this.state.currentItems.sort((a, b) => {
			if (a[sortByType] > b[sortByType]) 	return 1;
			
			if (a[sortByType] < b[sortByType]) return -1;

			return 0;
		})
		this.setState({
			currentItems: items,
			action: 'sort',
		})
	}

	filterAllItems = () => {
		const {search} = this.state;
		const regex = new RegExp(search, 'gi'); 	
		return this.state.allItems.filter((item) => {
			return item.id.toString().match(regex) ||
			       item.first_name.match(regex) ||
						 item.last_name.match(regex) ||
						 item['Animal Name'].match(regex) || 
						 item['IP Address'].match(regex)
		}).slice(0, this.state.itemsPerPage)
	}
	
	handlePaginate = (e) => {
		let page, items;
		
		if (e.target.innerText === '>>') {
			page = this.state.currentPage + 1;
		} else if (e.target.innerText === '<<') {
			page = this.state.currentPage - 1 <= 0 ? 1 : this.state.currentPage - 1;
		} else {
			page = parseInt(e.target.outerText);
		}
		let startIndex = ((page - 1) * this.state.itemsPerPage);
		let endIndex = startIndex + this.state.itemsPerPage;
		items = this.state.allItems.slice(startIndex, endIndex);
		this.setState({
			currentPage: page,
			action: 'paginate',
			currentItems: items
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
	handleSearch = (e) => {
		this.setState({
			search: e.target.value,
			action: 'search',
		})
	}
	handleFilterSelect = (e) => {
		let dataset = e.target.dataset;
		let filter = Object.keys(e.target.dataset)[0];
		let selectedFilter = dataset[filter];
		const newFilters = {
			...this.state.filters,
			[selectedFilter]: !this.state.filters[selectedFilter]
		}
		this.setState({
			filters: newFilters
		})
	}

	render() {
		return (
			<div className="table-wrapper">
				<Header
					handleSearch={this.handleSearch}
					filters={this.state.filters}
					handleFilterSelect={this.handleFilterSelect}
				/>
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