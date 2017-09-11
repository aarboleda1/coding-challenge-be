export const getFilters = (obj) => {
	const filters = {};
	for(let key in obj) {
		filters[key] = true;
	}
	return filters;
} 

export const endPoint = 'http://localhost:8080/data';
