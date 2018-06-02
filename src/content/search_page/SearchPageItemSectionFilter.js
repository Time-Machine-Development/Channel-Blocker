function SearchPageItemSectionFilter(target, parent) {
	Filter.call(this, target, parent);
}

SearchPageItemSectionFilter.prototype = Object.create(Filter.prototype);

SearchPageItemSectionFilter.prototype.constructor = SearchPageItemSectionFilter;

SearchPageItemSectionFilter.prototype.onFound = function(child){
	console.log("new SearchPageSectionFilter");
	console.log(child);
	let searchFilter = new SearchPageSectionFilter(child, this);
};
